const ffmpeg = require('ffmpeg-static');
const sharp = require('sharp');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VIDEO_DIR = path.join(__dirname, '..', 'src', 'assets', 'Video');
const AVATAR_DIR = path.join(__dirname, '..', 'public', 'avatar');
const TEMP_DIR = path.join(__dirname, 'temp_raw_frames');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

async function processPngToWebp(pngPath, outWebpPath) {
  const { data, info } = await sharp(pngPath)
    .resize(281, 500)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Remove bottom-right watermark area
      if (y > 445 && x > 215) {
        data[idx + 3] = 0;
        continue;
      }

      const maxRB = Math.max(r, b);
      const diff = g - maxRB;

      // Green screen keying
      if (g > 78 && diff > 20) {
        data[idx + 3] = 0;
      } else if (g > 68 && diff > 10) {
        const factor = (diff - 10) / 10;
        data[idx + 3] = Math.max(0, Math.min(255, Math.floor(255 * (1 - factor))));
        data[idx + 1] = maxRB; // despill
      }
    }
  }

  await sharp(data, { raw: info })
    .webp({ quality: 90, effort: 4 })
    .toFile(outWebpPath);
}

async function extractAndConvert(videoFileName, targetFolder, targetCount, options = {}) {
  const videoPath = path.join(VIDEO_DIR, videoFileName);
  const outFolder = path.join(AVATAR_DIR, targetFolder);
  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder, { recursive: true });

  console.log(`\n🎬 Processing ${videoFileName} -> ${targetFolder} (${targetCount} frames)...`);

  // Clear temp folder
  const tempFiles = fs.readdirSync(TEMP_DIR);
  for (const f of tempFiles) fs.unlinkSync(path.join(TEMP_DIR, f));

  // Extract PNG frames via ffmpeg
  // We use fps filter or select filter to get evenly distributed targetCount frames
  const probe = spawnSync(ffmpeg, ['-i', videoPath], { encoding: 'utf8' });
  const durMatch = (probe.stdout + probe.stderr).match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d+)/);
  let duration = 5.0;
  if (durMatch) {
    duration = parseFloat(durMatch[1]) * 3600 + parseFloat(durMatch[2]) * 60 + parseFloat(durMatch[3]);
  }

  let fps = (targetCount / duration).toFixed(3);
  if (options.loop) {
    // If loop, we can extract from the middle/loop segment
    fps = ((targetCount * 1.5) / duration).toFixed(3);
  }

  const ffmpegArgs = [
    '-y',
    '-i', videoPath,
    '-vf', `fps=${fps}`,
    path.join(TEMP_DIR, 'frame_%04d.png')
  ];

  spawnSync(ffmpeg, ffmpegArgs, { stdio: 'inherit' });

  // Read extracted png files
  let extracted = fs.readdirSync(TEMP_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  if (extracted.length === 0) {
    console.error(`❌ No frames extracted for ${videoFileName}`);
    return;
  }

  console.log(`  Extracted ${extracted.length} raw frames, sampling ${targetCount} frames...`);

  // Evenly pick targetCount frames
  for (let i = 0; i < targetCount; i++) {
    const srcIndex = Math.min(
      extracted.length - 1,
      Math.floor((i / targetCount) * extracted.length)
    );
    const srcPng = path.join(TEMP_DIR, extracted[srcIndex]);
    const frameNumber = String(i + 1).padStart(3, '0');
    const outWebp = path.join(outFolder, `frame_${frameNumber}.webp`);

    await processPngToWebp(srcPng, outWebp);
    process.stdout.write(`\r  Saved ${targetFolder} frame_${frameNumber}.webp (${i + 1}/${targetCount})`);
  }
  console.log(`\n  ✅ Completed ${targetFolder}`);
}

async function main() {
  console.log('🚀 Starting Avatar Frame Generation for Ritesh Kumar...');

  // 1. Idle (36 frames)
  await extractAndConvert('Idle.mp4', 'idle', 36);

  // 2. Scroll (96 frames)
  await extractAndConvert('idel laptop showing.mp4', 'scroll', 96);

  // 3. Action (72 frames)
  await extractAndConvert('idel laptop showing.mp4', 'action', 72);

  // 4. Hover Projects (72 frames)
  await extractAndConvert('Project showing.mp4', 'hover_projects', 72);

  // 5. Hover Projects Loop (72 frames)
  await extractAndConvert('Project showing.mp4', 'hover_projects_loop', 72, { loop: true });

  // 6. Hover Contact (72 frames)
  await extractAndConvert('Contact.mp4', 'hover_contact', 72);

  // 7. Hover Contact Loop (72 frames)
  await extractAndConvert('Contact.mp4', 'hover_contact_loop', 72, { loop: true });

  // Clean temp folder
  const tempFiles = fs.readdirSync(TEMP_DIR);
  for (const f of tempFiles) fs.unlinkSync(path.join(TEMP_DIR, f));
  fs.rmdirSync(TEMP_DIR);

  console.log('\n🎉 ALL AVATAR FRAMES SUCCESSFULLY GENERATED AND REPLACED!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

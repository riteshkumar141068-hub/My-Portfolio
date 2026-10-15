const ffmpeg = require('ffmpeg-static');
const { spawnSync } = require('child_process');
const path = require('path');

const videoDir = path.join(__dirname, '..', 'src', 'assets', 'Video');
const files = ['Idle.mp4', 'idel laptop showing.mp4', 'Project showing.mp4', 'Contact.mp4', 'Website intro.mp4'];

for (const f of files) {
  const p = path.join(videoDir, f);
  const res = spawnSync(ffmpeg, ['-i', p], { encoding: 'utf8' });
  const out = (res.stdout || '') + (res.stderr || '');
  const durationMatch = out.match(/Duration: ([^,]+)/);
  const streamMatch = out.match(/Stream.*Video: ([^\n\r]+)/);
  console.log(f, '=>', durationMatch ? durationMatch[1] : 'unknown', '||', streamMatch ? streamMatch[1] : 'unknown');
}

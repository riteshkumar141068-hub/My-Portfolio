'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { projects } from '@/data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiCpu } from 'react-icons/fi';
import ProjectDemoModal from '@/components/ProjectDemoModal';
import { sound } from '@/utils/soundEffects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg || '#050505'};
  color: ${({ theme }) => theme.colors.text || 'white'};
  z-index: 5;
  
  /* 
    'overflow: clip' cleanly overrides any global 'overflow: hidden' 
    on <section> tags without creating a new scroll container. 
    This is REQUIRED for 'position: sticky' to reach the window viewport!
  */
  overflow: clip;

  .font-anton {
    font-family: 'Anton', sans-serif;
  }
  .custom-projects-cursor {
    pointer-events: none;
    position: fixed;
    top: 0; left: 0;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: #ffffff;
    mix-blend-mode: difference;
    z-index: 9999;
    opacity: 0;
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    will-change: transform, width, height;
    @media (pointer: coarse) {
        display: none;
    }
  }
  .custom-projects-cursor.active {
    opacity: 1;
  }
  .custom-projects-cursor.hovered {
    width: 80px; height: 80px;
    background: rgba(255, 255, 255, 1);
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100dvh; /* dvh ensures mobile Safari/Chrome UI bars don't hide the bottom of the container! */
  width: 100%;
  overflow: hidden;
  direction: ltr; /* Force LTR so overflow:hidden clips from the left in RTL (Arabic) mode */
  background-color: ${({ theme }) => theme.colors.bg || '#050505'};
`;

const Header = styled.header`
  position: absolute;
  top: 4.8rem;
  left: 1.25rem;
  z-index: 50;
  mix-blend-mode: difference;
  pointer-events: none;
  
  @media (min-width: 768px) {
    top: 7rem;
    left: 3rem;
  }
`;

const HeaderTitle = styled.h1`
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.1em;
  font-size: 1.15rem;
  line-height: 1.2;
  text-transform: uppercase;
  color: white;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ScrollHintWrapper = styled.div`
  position: absolute;
  top: 4.8rem;
  right: 1.25rem;
  z-index: 50;
  mix-blend-mode: difference;
  pointer-events: none;
  
  @media (min-width: 768px) {
    top: 7rem;
    right: 3rem;
  }
`;

const ScrollHintText = styled.p`
  color: white;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 300;
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border || 'rgba(255, 255, 255, 0.2)'};
  z-index: 50;
  pointer-events: none;
  
  @media (min-width: 768px) {
    bottom: 3rem;
    left: 3rem;
    right: 3rem;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.text || 'white'};
  transform-origin: left;
  transform: scaleX(0);
  will-change: transform;
`;

const ScrollContainer = styled.div`
  display: flex;
  height: 100%;
  width: max-content;
  will-change: transform;
  /* Force LTR so the flex order is always left-to-right.
     GSAP handles RTL via positive x-translation — if we let the browser
     reverse the flex items we get a double-reversal that hides projects. */
  direction: ltr;
`;

const Slide = styled.section`
  width: 120vw;
  @media (max-width: 768px) {
    width: 160vw;
  }
  height: 100vh;
  height: 100dvh; /* prevents overlap issues on mobile browsers */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  overflow: hidden; /* Prevent huge text from bleeding into next slide */
  background-color: ${({ theme }) => theme.colors.bg || '#050505'};
`;

const TitleParallaxOutline = styled.h2`
  position: absolute;
  z-index: 0;
  font-size: 25vw;
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  line-height: 0.85;
  text-align: center;
  pointer-events: none;
  user-select: none;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'};
  
  @media (min-width: 768px) {
    font-size: 16vw;
  }
`;

const TitleParallaxSolid = styled.h2`
  position: absolute;
  z-index: 20;
  color: white;
  font-size: 25vw;
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  line-height: 0.85;
  text-align: center;
  pointer-events: none;
  user-select: none;
  mix-blend-mode: difference;
  opacity: 0.9;
  
  @media (min-width: 768px) {
    font-size: 16vw;
  }
`;

const ImageWrapper = styled.a`
  width: 86vw;
  height: 60vh;
  background-color: #18181b;
  overflow: hidden;
  position: relative;
  z-index: 10;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-decoration: none;
  
  @media (min-width: 768px) {
    width: 45vw;
    height: 70vh;
    cursor: none;
  }
`;

const BrowserBar = styled.div`
  height: 2.35rem;
  background-color: #24242a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.85rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  position: relative;
  z-index: 30;
`;

const BrowserLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.$color};
`;

const BrowserAddressBar = styled.div`
  flex: 1;
  height: 1.4rem;
  background-color: #141418;
  border-radius: 5px;
  margin: 0 0.75rem;
  display: flex;
  align-items: center;
  padding: 0 0.65rem;
  font-size: 0.72rem;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid rgba(255,255,255,0.06);

  @media (max-width: 500px) {
    max-width: 48%;
    font-size: 0.65rem;
  }
`;

const RepoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover {
    background: #FF5722;
    border-color: #FF5722;
    box-shadow: 0 0 12px rgba(255, 87, 34, 0.6);
  }
`;

const ImageInnerContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.name === 'dark'
    ? 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1))'
    : 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1))'};
  z-index: 10;
  transition: opacity 0.7s, background 0.3s;
  opacity: 0.8;
  pointer-events: none;
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

/* ProjectImage replaced by next/image — see JSX below */
const ProjectImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  will-change: transform;
  transition: transform 0.7s;
  transform: scale(1);

  /* Allow GSAP / CSS to animate objectPosition on the inner img */
  img {
    object-position: top;
    transition: object-position 0s; /* GSAP controls this directly */
  }

  ${ImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 20;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  direction: inherit; /* Allow Arabic text inside slides to render RTL correctly */
  
  @media (min-width: 768px) {
    bottom: 2.5rem;
    left: 2.5rem;
    right: 2.5rem;
  }
`;

const ProjectRole = styled.p`
  color: ${({ theme }) => theme.colors.text || 'white'};
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 300;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const RoleIndex = styled.span`
  font-weight: 700;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
`;

const ProjectDescText = styled.p`
  color: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
  margin: 0;
  max-width: 28rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.82rem;
    opacity: 0.95;
    transform: none;
  }
  
  @media (min-width: 769px) {
    display: block;
    font-size: 1rem;
    font-weight: 300;
    opacity: 0;
    transition: all 0.5s;
    transform: translateY(1rem);
    will-change: transform;
    
    ${ImageWrapper}:hover & {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ViewProjectBtn = styled.div`
  margin-top: 0.4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentLight || '#FF5722'};
  transition: all 0.4s ease;
  
  @media (max-width: 768px) {
    opacity: 1;
    transform: none;
    font-size: 0.75rem;
  }

  @media (min-width: 769px) {
    opacity: 0;
    transition-delay: 0.1s;
    transform: translateY(1rem);
    font-size: 0.875rem;
    
    ${ImageWrapper}:hover & {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Arrow = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.3s;
  
  ${ImageWrapper}:hover & {
    transform: translateX(0.5rem);
  }
`;

const DemoButton = styled.button`
  margin-top: 0.4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(0, 234, 100, 0.15);
  border: 1px solid rgba(0, 234, 100, 0.4);
  color: #00ea64;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 30;

  &:hover {
    background: #00ea64;
    color: #000;
    box-shadow: 0 0 15px rgba(0, 234, 100, 0.4);
    transform: scale(1.05);
  }
`;

export default function Projects() {
  const { t, language = 'fr', isRtl = false } = useLanguage();
  const translatedItems = t('projects.items') || [];

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const cursorRef = useRef(null);

  const [sectionHeight, setSectionHeight] = useState('400vh');
  const [selectedDemoProject, setSelectedDemoProject] = useState(null);

  // Calculate required height based on number of projects
  useEffect(() => {
    const updateHeight = () => {
      const totalHeight = (projects.length * window.innerWidth) + window.innerHeight;
      setSectionHeight(`${totalHeight}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // GSAP ScrollTrigger Logic
  // CRITICAL: We delay initialization to ensure Hero's pin-spacer (+=400vh) 
  // has been injected into the DOM. Without this, ScrollTrigger calculates 
  // our "top top" start position ~400vh too early because the spacer doesn't 
  // exist yet when we mount.
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    let ctx;
    // 500ms delay ensures Hero's pin-spacer
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // We do NOT use containerRef.current.scrollWidth because overflowing title text 
        const winWidth = window.innerWidth;
        const isMobile = winWidth <= 768;
        const slideWidth = isMobile ? winWidth * 1.6 : winWidth * 1.2; // Match the Slide width
        const totalScrollDistance = (projects.length - 1) * slideWidth;
        // Always negative: direction:ltr on the container means layout is always left→right,
        // so we always translate LEFT to reveal the next project.
        const targetX = -totalScrollDistance;

        // Initialize base state
        gsap.set(containerRef.current, { x: 0 });
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left' });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            // LOWER priority = refreshes AFTER Hero (priority 1).
            // This guarantees we see the correct document height including Hero's pin-spacer.
            refreshPriority: -1,
          }
        });

        // 5% pause so the first project stays visible briefly before scrolling begins
        tl.to({}, { duration: 0.05 });

        // Horizontal slide for the remaining 95% of the scroll duration
        tl.to(containerRef.current, {
          x: targetX,
          ease: "none",
          duration: 0.95
        }, 0.05);

        // Progress bar
        if (progressBarRef.current) {
          tl.to(progressBarRef.current, {
            scaleX: 1,
            ease: "none",
            duration: 0.95
          }, 0.05);
        }

        // Per-slide parallax
        const slides = containerRef.current.querySelectorAll('.slide');
        const numSlides = slides.length;
        const mainMoveDuration = 0.95;
        const segment = mainMoveDuration / Math.max(1, numSlides - 1);

        slides.forEach((slide, i) => {
          // next/image renders an <img> inside the .parallax-bg wrapper div.
          // We target the img element directly so objectPosition animation works.
          const imgEl = slide.querySelector('.parallax-bg img') || slide.querySelector('.parallax-bg');
          if (imgEl) {
            // Calculate strictly when this specific slide is panning through the viewport
            let startT = 0.05 + (i - 1) * segment;
            let dur = 2 * segment;
            
            if (i === 0) {
              startT = 0; // Starts animating immediately during the 5% delay
              dur = 0.05 + segment; 
            } else if (i === numSlides - 1) {
              startT = 0.05 + (i - 1) * segment;
              dur = segment;
            }

            // Scroll the tall screenshot downwards independently
            tl.to(imgEl, {
              objectPosition: "50% 100%", 
              ease: "none",
              duration: dur
            }, Math.max(0, startT));
          }

          const titles = slide.querySelectorAll('.title-parallax');
          titles.forEach((title) => {
            tl.to(title, {
              x: "-5%",
              ease: "none",
              duration: 0.95
            }, 0.05);
          });
        });

      }, sectionRef);

      // One final refresh after our ScrollTrigger is created
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [isRtl, projects.length]);

  // Custom Cursor Logic (desktop only — cursor is hidden on touch devices)
  useEffect(() => {
    // Skip on touch devices — the cursor is invisible via CSS `pointer: coarse` anyway
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let targetCursorX = cursorX;
    let targetCursorY = cursorY;
    let animationFrameId;

    const handleMouseMove = (e) => {
      targetCursorX = e.clientX;
      targetCursorY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateCursor = () => {
      if (!sectionRef.current) {
        animationFrameId = requestAnimationFrame(animateCursor);
        return;
      }

      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Basic visibility check
      if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
        if (cursorRef.current && !cursorRef.current.classList.contains('active')) {
          cursorRef.current.classList.add('active');
        }
      } else {
        if (cursorRef.current && cursorRef.current.classList.contains('active')) {
          cursorRef.current.classList.remove('active');
        }
      }

      cursorX += (targetCursorX - cursorX) * 0.15;
      cursorY += (targetCursorY - cursorY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseEnterImage = () => cursorRef.current?.classList.add('hovered');
  const handleMouseLeaveImage = () => cursorRef.current?.classList.remove('hovered');

  return (
    <ProjectsSection id="projects" ref={sectionRef} style={{ height: sectionHeight }}>
      <div ref={cursorRef} className="custom-projects-cursor" />

      <StickyContainer>
        <Header>
          <HeaderTitle>
            {t('projects.label') || 'Studio'}<br />{t('projects.title') || 'Cinématique'}
          </HeaderTitle>
        </Header>

        <ScrollHintWrapper>
          <ScrollHintText>
            {t('projects.scrollHint')}
          </ScrollHintText>
        </ScrollHintWrapper>

        <ProgressBarWrapper>
          <ProgressBar ref={progressBarRef} />
        </ProgressBarWrapper>

        <ScrollContainer ref={containerRef}>
          {projects.map((projet, index) => {
            const translated = Array.isArray(translatedItems) ? translatedItems[index] : null;
            const title = translated?.title || projet.title;
            const description = translated?.description || projet.description;
            const role = projet.category || projet.subtitle;

            return (
              <Slide key={projet.id} className="slide" data-index={index}>
                <TitleParallaxOutline className="title-parallax">
                  {title.split(' ').map((word, i, arr) => (
                    <span key={i}>
                      {word}
                      {i !== arr.length - 1 && <br />}
                    </span>
                  ))}
                </TitleParallaxOutline>

                <ImageWrapper
                  href={translated?.link || projet.link || "https://github.com/riteshkumar141068-hub"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={handleMouseEnterImage}
                  onMouseLeave={handleMouseLeaveImage}
                >
                  <BrowserBar>
                    <BrowserLeft>
                      <Dot $color="#ff5f56" />
                      <Dot $color="#ffbd2e" />
                      <Dot $color="#27c93f" />
                    </BrowserLeft>
                    <BrowserAddressBar>
                      {(translated?.link || projet.link || 'github.com/riteshkumar141068-hub').replace('https://', '')}
                    </BrowserAddressBar>
                    <RepoBadge>
                      <FaGithub size={13} />
                      <span>Code</span>
                      <FiExternalLink size={10} />
                    </RepoBadge>
                  </BrowserBar>
                  <ImageInnerContainer>
                    <GradientOverlay />
                    <ProjectImageWrapper className="parallax-bg">
                      <Image
                        src={translated?.image || projet.image}
                        alt={`${title} project preview`}
                        fill
                        sizes="(max-width: 768px) 86vw, 45vw"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        priority={index === 0}
                        quality={80}
                      />
                    </ProjectImageWrapper>
                    <ProjectInfo>
                      <ProjectRole>
                        <RoleIndex>0{index + 1}</RoleIndex> {role}
                      </ProjectRole>
                      <ProjectDescText>
                        {description}
                      </ProjectDescText>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                        <ViewProjectBtn>
                          <FaGithub size={14} />
                          {t('projects.viewProject') || 'View Project'} <Arrow>→</Arrow>
                        </ViewProjectBtn>
                        <DemoButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            sound.playClick();
                            setSelectedDemoProject(projet);
                          }}
                        >
                          ⚡ Architecture &amp; Demo
                        </DemoButton>
                      </div>
                    </ProjectInfo>
                  </ImageInnerContainer>
                </ImageWrapper>

                <TitleParallaxSolid className="title-parallax">
                  {title.split(' ').map((word, i, arr) => (
                    <span key={i}>
                      {word}
                      {i !== arr.length - 1 && <br />}
                    </span>
                  ))}
                </TitleParallaxSolid>
              </Slide>
            );
          })}
        </ScrollContainer>
      </StickyContainer>

      {/* ── Interactive Cyber Project Architecture & Demo Modal ── */}
      {selectedDemoProject && (
        <ProjectDemoModal
          project={selectedDemoProject}
          onClose={() => setSelectedDemoProject(null)}
        />
      )}
    </ProjectsSection>
  );
}

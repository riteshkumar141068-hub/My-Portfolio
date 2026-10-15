'use client';
import styled, { keyframes } from 'styled-components';
import { FiX, FiExternalLink, FiCode, FiLayers, FiCheckCircle, FiCpu, FiMonitor } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { sound } from '@/utils/soundEffects';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(15px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(5, 7, 14, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 99997;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  animation: ${fadeIn} 0.25s ease;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 900px;
  max-height: 92vh;
  background: #0f121d;
  border: 1px solid ${({ $color }) => `${$color}44` || 'rgba(255, 255, 255, 0.15)'};
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px ${({ $color }) => `${$color}22` || 'rgba(0,0,0,0)'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  background: #141926;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h4 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
  span.category {
    background: ${({ $color }) => `${$color}20`};
    color: ${({ $color }) => $color};
    border: 1px solid ${({ $color }) => `${$color}45`};
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/* Cyber Browser Mockup Frame */
const BrowserFrame = styled.div`
  background: #090c14;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
`;

const BrowserTopBar = styled.div`
  background: #121622;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  div.dots {
    display: flex;
    gap: 6px;
    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &:nth-child(1) { background: #ef4444; }
      &:nth-child(2) { background: #f59e0b; }
      &:nth-child(3) { background: #10b981; }
    }
  }

  div.address-bar {
    flex: 1;
    background: #090c14;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 0.25rem 0.75rem;
    font-size: 0.72rem;
    color: #94a3b8;
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const BrowserScreen = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.92);
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DescriptionBox = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.25rem;

  h5 {
    font-size: 0.92rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.65rem 0;
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  p {
    font-size: 0.85rem;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0 0 1rem 0;
  }
`;

const TechStackList = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.25rem;

  h5 {
    font-size: 0.92rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.75rem 0;
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  div.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  span {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    font-family: monospace;
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1.15rem;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;

    &.github {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      &:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-2px);
      }
    }

    &.primary {
      background: ${({ $color }) => $color || '#ff7a00'};
      color: #000;
      font-weight: 700;
      box-shadow: 0 4px 15px ${({ $color }) => `${$color}44`};
      &:hover {
        transform: translateY(-2px);
        filter: brightness(1.15);
      }
    }
  }
`;

export default function ProjectDemoModal({ project, onClose }) {
  if (!project) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard $color={project.color} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderLeft $color={project.color}>
            <FiMonitor size={20} style={{ color: project.color }} />
            <div>
              <h4>{project.title}</h4>
            </div>
            <span className="category">{project.category}</span>
          </HeaderLeft>
          <CloseButton onClick={onClose} title="Close (Esc)">
            <FiX size={18} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {/* Mockup Frame */}
          <BrowserFrame>
            <BrowserTopBar>
              <div className="dots">
                <span /><span /><span />
              </div>
              <div className="address-bar">
                https://ritesh-dev.io/projects/{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              </div>
            </BrowserTopBar>
            <BrowserScreen>
              <img src={project.image} alt={project.title} />
            </BrowserScreen>
          </BrowserFrame>

          {/* Info Details */}
          <InfoGrid>
            <DescriptionBox>
              <h5><FiLayers /> Project Overview &amp; Architecture</h5>
              <p>{project.description}</p>
              <p style={{ color: '#00ea64', fontSize: '0.8rem', margin: 0 }}>
                ✓ Production-tested algorithms, responsive architecture, and modular clean code design.
              </p>
            </DescriptionBox>

            <TechStackList>
              <h5><FiCpu /> Core Tech Stack</h5>
              <div className="tags">
                {project.tech?.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </TechStackList>
          </InfoGrid>

          {/* Action CTAs */}
          <ActionRow $color={project.color}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github"
              onClick={() => sound.playClick()}
            >
              <FaGithub size={15} />
              <span>Inspect Codebase</span>
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="primary"
              onClick={() => sound.playClick()}
            >
              <span>Launch Live Project</span>
              <FiExternalLink size={14} />
            </a>
          </ActionRow>
        </ModalBody>
      </ModalCard>
    </ModalOverlay>
  );
}

'use client';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FiZap, 
  FiX, 
  FiCheckCircle, 
  FiMail, 
  FiCopy, 
  FiCheck, 
  FiExternalLink, 
  FiFileText, 
  FiShield, 
  FiMapPin, 
  FiCalendar, 
  FiCode, 
  FiCpu 
} from 'react-icons/fi';
import { FaWhatsapp, FaGithub, FaLinkedinIn } from 'react-icons/fa';
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
  background: rgba(5, 7, 14, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 99996;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  animation: ${fadeIn} 0.25s ease;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  background: #0f121d;
  border: 1px solid rgba(255, 122, 0, 0.35);
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 122, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ModalHeader = styled.div`
  padding: 1.25rem 1.75rem;
  background: #141926;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ZapBadge = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 122, 0, 0.15);
  border: 1px solid rgba(255, 122, 0, 0.4);
  color: #ff7a00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const TitleText = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusPill = styled.span`
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.35);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
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

const ModalContent = styled.div`
  padding: 1.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 122, 0, 0.25);
    border-radius: 3px;
  }
`;

const HeroSummary = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }
`;

const CandidateAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #ff7a00;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(255, 122, 0, 0.3);
`;

const CandidateInfo = styled.div`
  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.25rem 0;
  }
  p.role {
    font-size: 0.95rem;
    color: #ff7a00;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }
  div.meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 0.8rem;
    color: #94a3b8;

    span {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: ${({ $bg }) => $bg || 'rgba(255,255,255,0.04)'};
  border: 1px solid ${({ $border }) => $border || 'rgba(255,255,255,0.1)'};
  border-radius: 12px;
  color: ${({ $color }) => $color || '#fff'};
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    filter: brightness(1.15);
  }
`;

const SectionBox = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.25rem;

  h5 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.85rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #ff7a00;
    }
  }
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  li {
    font-size: 0.85rem;
    color: #cbd5e1;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    line-height: 1.5;

    svg {
      color: #10b981;
      flex-shrink: 0;
      margin-top: 0.2rem;
    }
  }
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;

  span {
    background: rgba(255, 122, 0, 0.1);
    border: 1px solid rgba(255, 122, 0, 0.3);
    color: #ff9f43;
    padding: 0.25rem 0.65rem;
    border-radius: 6px;
    font-size: 0.78rem;
    font-family: monospace;
    font-weight: 600;
  }
`;

export default function RecruiterModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('ritesh.kumar141068@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderTitleGroup>
            <ZapBadge>
              <FiZap />
            </ZapBadge>
            <div>
              <TitleText>
                Recruiter Fast Dossier
                <StatusPill>
                  <FiCheckCircle size={11} /> Open to Hire
                </StatusPill>
              </TitleText>
            </div>
          </HeaderTitleGroup>
          <CloseButton onClick={onClose} title="Close">
            <FiX size={18} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {/* Hero Summary */}
          <HeroSummary>
            <CandidateAvatar src="/ritesh-headshot.png" alt="Ritesh Kumar" />
            <CandidateInfo>
              <h4>Ritesh Kumar</h4>
              <p className="role">Software Engineering Intern &amp; AI Developer</p>
              <div className="meta">
                <span><FiCalendar /> Immediate Joiner / Remote</span>
                <span><FiMapPin /> Uttar Pradesh, India (Open to Relocate)</span>
                <span><FiShield style={{ color: '#00ea64' }} /> HackerRank Certified</span>
              </div>
            </CandidateInfo>
          </HeroSummary>

          {/* Quick Actions for HR */}
          <QuickActionGrid>
            <ActionCard
              href="https://wa.me/918477861666?text=Hi%20Ritesh,%20I%20am%20a%20recruiter%20and%20reviewed%20your%20fast%20dossier.%20Let%27s%20schedule%20a%20call."
              target="_blank"
              rel="noopener noreferrer"
              $bg="rgba(37, 211, 102, 0.12)"
              $border="rgba(37, 211, 102, 0.35)"
              $color="#25d366"
              onClick={() => sound.playClick()}
            >
              <FaWhatsapp size={18} />
              <span>Direct WhatsApp Chat ↗</span>
            </ActionCard>

            <ActionCard
              as="button"
              onClick={handleCopyEmail}
              $bg="rgba(56, 189, 248, 0.12)"
              $border="rgba(56, 189, 248, 0.35)"
              $color="#38bdf8"
            >
              {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
              <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
            </ActionCard>

            <ActionCard
              href="/Ritesh_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              $bg="rgba(255, 122, 0, 0.12)"
              $border="rgba(255, 122, 0, 0.35)"
              $color="#ff7a00"
              onClick={() => sound.playClick()}
            >
              <FiFileText size={16} />
              <span>View ATS Resume (PDF) ↗</span>
            </ActionCard>
          </QuickActionGrid>

          {/* Key Executive Highlights */}
          <SectionBox>
            <h5><FiCheckCircle /> Executive Highlights for Hiring Managers</h5>
            <HighlightsList>
              <li>
                <FiCheckCircle size={15} />
                <span>
                  <strong>Software Engineering Intern @ Apexsquare Solutions:</strong> Hands-on development of production-grade Java & Python software, RESTful API integrations, and database optimizations.
                </span>
              </li>
              <li>
                <FiCheckCircle size={15} />
                <span>
                  <strong>HackerRank Role Certified Software Engineer:</strong> Verified credential (ID: <code>F89BCD89AFE8</code>) in Data Structures, Problem Solving, and Algorithms.
                </span>
              </li>
              <li>
                <FiCheckCircle size={15} />
                <span>
                  <strong>B.Tech Computer Science &amp; Engineering:</strong> Dr. A.P.J. Abdul Kalam Technical University (AKTU), 2022–2026. Strong CS foundations in AI, Systems, and Software Architecture.
                </span>
              </li>
              <li>
                <FiCheckCircle size={15} />
                <span>
                  <strong>Modern Full-Stack Mastery:</strong> Rapid development capabilities using Next.js 15, React, Three.js, Node.js, and Python ML pipelines.
                </span>
              </li>
            </HighlightsList>
          </SectionBox>

          {/* Core Technical Arsenal */}
          <SectionBox>
            <h5><FiCpu /> Core Technical Arsenal</h5>
            <StackTags>
              <span>Java</span>
              <span>Python</span>
              <span>JavaScript (ES6+)</span>
              <span>React.js</span>
              <span>Next.js 15</span>
              <span>REST APIs</span>
              <span>PostgreSQL</span>
              <span>MongoDB</span>
              <span>Data Structures</span>
              <span>Algorithms</span>
              <span>Git &amp; GitHub</span>
              <span>Docker Basics</span>
            </StackTags>
          </SectionBox>
        </ModalContent>
      </ModalCard>
    </ModalOverlay>
  );
}

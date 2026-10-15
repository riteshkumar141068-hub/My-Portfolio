'use client';
import { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiTerminal, FiX, FiMinus, FiMaximize2, FiCornerDownLeft, FiCheck, FiExternalLink } from 'react-icons/fi';
import { sound } from '@/utils/soundEffects';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const TerminalLauncher = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9990;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.25rem;
  background: rgba(13, 16, 26, 0.92);
  border: 1px solid rgba(0, 234, 100, 0.4);
  border-radius: 999px;
  color: #00ea64;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 234, 100, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-3px) scale(1.03);
    border-color: #00ea64;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 234, 100, 0.45);
    background: rgba(18, 24, 38, 0.96);
  }

  @media (max-width: 768px) {
    bottom: 1.25rem;
    right: 1.25rem;
    padding: 0.6rem 1rem;
    font-size: 0.78rem;
  }
`;

const PulseDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ea64;
  box-shadow: 0 0 8px #00ea64;
  animation: ${blink} 1.5s infinite;
`;

const TerminalModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  z-index: 99995;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${slideIn} 0.25s ease-out;
`;

const TerminalWindow = styled.div`
  width: 100%;
  max-width: 780px;
  height: 520px;
  max-height: 85vh;
  background: #0c0f17;
  border: 1px solid rgba(0, 234, 100, 0.3);
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 234, 100, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'JetBrains Mono', monospace;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: #131722;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 600;

  svg {
    color: #00ea64;
  }
`;

const WindowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    &.close:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.2);
    }
  }
`;

const TerminalBody = styled.div`
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #cbd5e1;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 234, 100, 0.2);
    border-radius: 3px;
  }
`;

const Banner = styled.pre`
  color: #00ea64;
  font-size: 0.75rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(0, 234, 100, 0.4);
`;

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 1.25rem 0;
`;

const CommandChip = styled.button`
  background: rgba(0, 234, 100, 0.08);
  border: 1px solid rgba(0, 234, 100, 0.25);
  color: #00ea64;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 234, 100, 0.2);
    border-color: #00ea64;
    transform: translateY(-1px);
  }
`;

const HistoryEntry = styled.div`
  margin-bottom: 0.85rem;
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #38bdf8;
  font-weight: 600;

  span.prompt {
    color: #00ea64;
  }
`;

const CommandOutput = styled.div`
  margin-top: 0.35rem;
  color: #e2e8f0;
  padding-left: 1rem;
  border-left: 2px solid rgba(0, 234, 100, 0.2);
  white-space: pre-wrap;
`;

const InputRow = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #111520;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  span.prompt {
    color: #00ea64;
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
  }
`;

const TerminalInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-family: inherit;
  font-size: 0.88rem;

  &::placeholder {
    color: #475569;
  }
`;

const INITIAL_HISTORY = [
  {
    cmd: 'welcome',
    output: `Interactive Cyber CLI initialized.\nType 'help' to see available commands or click quick chips.`
  }
];

export default function CyberTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  useEffect(() => {
    if (isOpen) {
      sound.playClick();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    sound.playClick();

    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'exit') {
      setIsOpen(false);
      return;
    }

    let output = '';

    switch (cmd) {
      case 'help':
        output = `AVAILABLE COMMANDS:
  • skills         : List programming languages, tools & frameworks
  • projects       : View flagship software & AI projects
  • experience     : View internship at Apexsquare & education
  • certifications : Check verified HackerRank & ICAT credentials
  • contact        : Direct WhatsApp & Email contact channels
  • whoami         : Reveal guest recruiter profile
  • sudo hire      : Fast-track candidate hiring pipeline
  • clear          : Clear terminal screen
  • exit           : Close terminal window`;
        break;

      case 'skills':
        output = `CORE COMPETENCIES:
  [Languages]   : Python, Java, JavaScript (ES6+), C/C++, SQL
  [Frontend]    : React.js, Next.js, Three.js, Styled-Components, Tailwind
  [Backend/DB]  : Node.js, Express, REST APIs, PostgreSQL, MySQL, MongoDB
  [AI/ML/CS]    : Data Structures, Algorithms, Problem Solving, Machine Learning
  [Tools/Cloud] : Git, GitHub, Linux, Docker, Postman, VS Code`;
        break;

      case 'projects':
        output = `FEATURED PROJECTS:
  1. 3D Cyber Developer Portfolio
     • Next.js 15, Three.js, GSAP, Styled-Components
     • Fully responsive 3D interactive portfolio with protected credentials.

  2. AI & Data Analytics Dashboard
     • Python, Pandas, REST APIs, ML Models
     • Real-time data pipeline with intelligent trend forecasting.

  3. Full-Stack Web Application Platform
     • React, Node.js, MongoDB, Clean Architecture
     • High-performance secure web apps with modern UX.`;
        break;

      case 'experience':
        output = `PROFESSIONAL JOURNEY:
  • Software Engineering Intern @ Apexsquare Solutions (April 2026 - Present)
    - Java & Python app development, performance optimization, clean code.
  • B.Tech in Computer Science & Engineering @ AKTU (2022 - 2026 Expected)
    - Strong academic focus on AI, Data Structures & Algorithm Design.`;
        break;

      case 'certifications':
        output = `VERIFIED CREDENTIALS:
  1. HackerRank Role Certification — Software Engineer
     • ID: F89BCD89AFE8 | Officially Certified (Harishankaran K, CTO)
  2. ICAT — Internship Common Aptitude Test
     • ID: CIT-P-3810557 | Merit Verified in Engineering Aptitude & Logic`;
        break;

      case 'contact':
        output = `CONTACT INFORMATION:
  • Email     : ritesh.kumar141068@gmail.com
  • WhatsApp  : +91 8477861666 (Direct messaging enabled)
  • Location  : Aligarh, Uttar Pradesh / Open for Remote & Relocation`;
        break;

      case 'whoami':
        output = `Guest Recruiter / Visionary Tech Lead looking for a talented, high-impact Software Engineer. You are in the right place!`;
        break;

      case 'sudo hire':
      case 'sudo hire ritesh':
        output = `[PERMISSION GRANTED]: Initiating priority hiring pipeline...
Opening direct WhatsApp channel with Ritesh Kumar.`;
        setTimeout(() => {
          window.open('https://wa.me/918477861666?text=Hi%20Ritesh,%20I%20saw%20your%20interactive%20portfolio%20and%20CLI%20terminal!%20Let%27s%20connect.', '_blank');
        }, 1200);
        break;

      default:
        output = `Command not recognized: '${cmd}'. Type 'help' to see available commands.`;
        break;
    }

    setHistory(prev => [...prev, { cmd, output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal('');
  };

  const handleChipClick = (cmd) => {
    executeCommand(cmd);
  };

  return (
    <>
      <TerminalLauncher onClick={() => setIsOpen(true)} title="Launch Cyber CLI Terminal (Ctrl+K)">
        <PulseDot />
        <FiTerminal size={16} />
        <span>&gt;_ Terminal</span>
      </TerminalLauncher>

      {isOpen && (
        <TerminalModalBackdrop onClick={() => setIsOpen(false)}>
          <TerminalWindow onClick={(e) => e.stopPropagation()}>
            <TerminalHeader>
              <HeaderTitle>
                <FiTerminal size={15} />
                <span>ritesh@portfolio-cli: ~</span>
              </HeaderTitle>
              <WindowControls>
                <button onClick={() => setIsOpen(false)} title="Minimize">
                  <FiMinus size={14} />
                </button>
                <button className="close" onClick={() => setIsOpen(false)} title="Close (Esc)">
                  <FiX size={14} />
                </button>
              </WindowControls>
            </TerminalHeader>

            <TerminalBody>
              <Banner>
{`
 ██████╗ ██╗████████╗███████╗███████╗██╗  ██╗   ██████╗██╗     ██╗
 ██╔══██╗██║╚══██╔══╝██╔════╝██╔════╝██║  ██║  ██╔════╝██║     ██║
 ██████╔╝██║   ██║   █████╗  ███████╗███████║  ██║     ██║     ██║
 ██╔══██╗██║   ██║   ██╔══╝  ╚════██║██╔══██║  ██║     ██║     ██║
 ██║  ██║██║   ██║   ███████╗███████║██║  ██║  ╚██████╗███████╗██║
 ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═════╝╚══════╝╚═╝
`}
              </Banner>

              <ChipsRow>
                {['help', 'skills', 'projects', 'experience', 'certifications', 'contact', 'sudo hire', 'clear'].map(c => (
                  <CommandChip key={c} type="button" onClick={() => handleChipClick(c)}>
                    &gt; {c}
                  </CommandChip>
                ))}
              </ChipsRow>

              {history.map((entry, idx) => (
                <HistoryEntry key={idx}>
                  <CommandLine>
                    <span className="prompt">ritesh@cli:~$</span>
                    <span>{entry.cmd}</span>
                  </CommandLine>
                  <CommandOutput>{entry.output}</CommandOutput>
                </HistoryEntry>
              ))}

              <div ref={bottomRef} />
            </TerminalBody>

            <InputRow onSubmit={handleSubmit}>
              <span className="prompt">ritesh@cli:~$</span>
              <TerminalInput
                ref={inputRef}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  sound.playTerminalKey();
                }}
                placeholder="Type command here (e.g. skills, projects, contact, sudo hire)..."
                autoFocus
              />
              <button type="submit" style={{ background: 'none', border: 'none', color: '#00ea64', cursor: 'pointer' }}>
                <FiCornerDownLeft size={16} />
              </button>
            </InputRow>
          </TerminalWindow>
        </TerminalModalBackdrop>
      )}
    </>
  );
}

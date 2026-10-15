'use client';
import styled from 'styled-components';
import { FiGitCommit, FiAward, FiCode, FiTrendingUp, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { FaGithub, FaHackerrank } from 'react-icons/fa';
import { sound } from '@/utils/soundEffects';

const StatsContainer = styled.div`
  margin-top: 3.5rem;
  padding: 2.25rem;
  background: ${({ theme }) => theme.colors.glass || 'rgba(15, 18, 28, 0.7)'};
  border: 1px solid ${({ theme }) => theme.colors.border || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 20px;
  backdrop-filter: blur(14px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff5722, #00ea64, #38bdf8);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text || '#fff'};
    margin: 0;
  }
  span.badge {
    background: rgba(0, 234, 100, 0.15);
    color: #00ea64;
    border: 1px solid rgba(0, 234, 100, 0.3);
    font-size: 0.72rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-weight: 700;
    font-family: monospace;
    text-transform: uppercase;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 1.25rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ $accent }) => $accent || '#ff7a00'};
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

const StatTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ $accent }) => $accent || '#ff7a00'};
  margin-bottom: 0.6rem;

  span.label {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted || '#94a3b8'};
    font-weight: 600;
  }
`;

const StatNumber = styled.div`
  font-size: 1.85rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text || '#fff'};
  font-family: ${({ theme }) => theme.fonts.mono || 'monospace'};
  letter-spacing: -0.02em;
`;

const StatSub = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary || '#cbd5e1'};
  margin-top: 0.35rem;
`;

const LanguageBreakdown = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  h5 {
    font-size: 0.88rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text || '#fff'};
    margin: 0 0 0.85rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  overflow: hidden;
  margin-bottom: 0.85rem;
`;

const Segment = styled.div`
  height: 100%;
  width: ${({ $width }) => $width};
  background: ${({ $color }) => $color};
  transition: width 0.6s ease;
`;

const LangLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textSecondary || '#cbd5e1'};

  span.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
  span.pct {
    font-family: monospace;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text || '#fff'};
  }
`;

export default function CodingStats() {
  return (
    <StatsContainer>
      <HeaderRow>
        <SectionHeader>
          <FiTrendingUp size={22} style={{ color: '#00ea64' }} />
          <h4>Live Engineering &amp; Problem Solving Metrics</h4>
          <span className="badge">Verified Telemetry</span>
        </SectionHeader>
      </HeaderRow>

      <Grid>
        <StatCard $accent="#38bdf8" onMouseEnter={() => sound.playHover()}>
          <StatTop $accent="#38bdf8">
            <span className="label">Total Contributions</span>
            <FaGithub size={18} />
          </StatTop>
          <StatNumber>850+</StatNumber>
          <StatSub>Consistent daily GitHub commit rhythm</StatSub>
        </StatCard>

        <StatCard $accent="#00ea64" onMouseEnter={() => sound.playHover()}>
          <StatTop $accent="#00ea64">
            <span className="label">HackerRank Certified</span>
            <FaHackerrank size={18} />
          </StatTop>
          <StatNumber>5-Star</StatNumber>
          <StatSub>Problem Solving, Algorithms &amp; DS</StatSub>
        </StatCard>

        <StatCard $accent="#ff7a00" onMouseEnter={() => sound.playHover()}>
          <StatTop $accent="#ff7a00">
            <span className="label">Production Codebase</span>
            <FiCode size={18} />
          </StatTop>
          <StatNumber>100%</StatNumber>
          <StatSub>Clean architecture &amp; tested modules</StatSub>
        </StatCard>

        <StatCard $accent="#a855f7" onMouseEnter={() => sound.playHover()}>
          <StatTop $accent="#a855f7">
            <span className="label">Academic Integrity</span>
            <FiAward size={18} />
          </StatTop>
          <StatNumber>B.Tech</StatNumber>
          <StatSub>CSE @ AKTU (2022 - 2026 Expected)</StatSub>
        </StatCard>
      </Grid>

      {/* Language Distribution Bar */}
      <LanguageBreakdown>
        <h5><FiCode /> Primary Code Distribution Across Repositories</h5>
        <ProgressBar>
          <Segment $width="38%" $color="#3776AB" title="Python (38%)" />
          <Segment $width="28%" $color="#F89820" title="Java (28%)" />
          <Segment $width="22%" $color="#61DAFB" title="JavaScript & React (22%)" />
          <Segment $width="12%" $color="#00EA64" title="SQL & APIs (12%)" />
        </ProgressBar>
        <LangLegend>
          <LegendItem $color="#3776AB">
            <span className="dot" />
            <span>Python</span>
            <span className="pct">38%</span>
          </LegendItem>
          <LegendItem $color="#F89820">
            <span className="dot" />
            <span>Java</span>
            <span className="pct">28%</span>
          </LegendItem>
          <LegendItem $color="#61DAFB">
            <span className="dot" />
            <span>JavaScript / React / Next.js</span>
            <span className="pct">22%</span>
          </LegendItem>
          <LegendItem $color="#00EA64">
            <span className="dot" />
            <span>SQL &amp; REST APIs</span>
            <span className="pct">12%</span>
          </LegendItem>
        </LangLegend>
      </LanguageBreakdown>
    </StatsContainer>
  );
}

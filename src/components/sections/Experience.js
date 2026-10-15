'use client';
import { useState } from 'react';
import styled from 'styled-components';
import SectionWrapper from '@/components/SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import ProtectedCertificateModal from '@/components/ProtectedCertificateModal';
import { 
  FiBriefcase, 
  FiAward, 
  FiCalendar, 
  FiMapPin, 
  FiCheckCircle, 
  FiFileText, 
  FiExternalLink, 
  FiShield,
  FiLock
} from 'react-icons/fi';

const TimelineGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TimelineCard = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.75rem;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0.8;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-4px);
    box-shadow: 0 12px 30px ${({ theme }) => theme.colors.shadow};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const RoleTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CompanyName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1rem;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
`;

const BadgeTime = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentGlow};
  border: 1px solid ${({ theme }) => theme.colors.accent}44;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.78rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 600;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BulletItem = styled.li`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  svg {
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TechTag = styled.span`
  padding: 0.25rem 0.65rem;
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.72rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

// ── Certifications Section ──
const CertificationsWrapper = styled.div`
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CertCard = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
  backdrop-filter: blur(14px);
  position: relative;
  overflow: hidden;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ $accent }) => $accent || '#FF5722'};
    opacity: 0.9;
  }

  &:hover {
    border-color: ${({ $accent }) => $accent || '#FF5722'};
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.3);
  }
`;

const CertTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CertBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: ${({ $accent }) => `${$accent}18`};
  border: 1px solid ${({ $accent }) => `${$accent}55`};
  color: ${({ $accent }) => $accent};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CertTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
`;

const CertIssuer = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent || '#FF5722'};
  margin-bottom: 0.85rem;
`;

const CertIdBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'};
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
  width: fit-content;
`;

const CertDesc = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
`;

const CertActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border}44;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const CertViewBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.15rem;
  background: ${({ $accent }) => $accent || '#FF5722'};
  color: #fff;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px ${({ $accent }) => `${$accent}35`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ $accent }) => `${$accent}60`};
    filter: brightness(1.1);
  }
`;

const AntiTamperNote = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.74rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 0.02em;

  svg {
    color: #10b981;
  }
`;

export default function Experience() {
  const { t, locale } = useLanguage();
  const [activeCert, setActiveCert] = useState(null);
  const isHi = locale === 'hi';

  const experienceData = [
    {
      role: isHi ? 'सॉफ्टवेयर इंजीनियरिंग इंटर्न' : 'Software Engineering Intern',
      company: 'Apexsquare Solutions',
      location: 'Hyderabad, Telangana (Remote)',
      period: isHi ? 'अप्रैल 2026 - वर्तमान' : 'April 2026 - Present',
      bullets: isHi ? [
        'Java और Python प्रोग्रामिंग भाषाओं का उपयोग करके सॉफ़्टवेयर ऐप्स का विकास और परीक्षण।',
        'तकनीकी समस्याओं को हल करने और सिस्टम प्रदर्शन को बेहतर बनाने के लिए टीम के साथ सहयोग।',
        'सहज नेविगेशन और बेहतर यूज़र अनुभव के लिए यूज़र-फ्रेंडली इंटरफ़ेस डिज़ाइन और कार्यान्वयन।',
        'क्लीन आर्किटेक्चर और इंजीनियरिंग मानकों को सुनिश्चित करने के लिए कोड समीक्षा में सक्रिय भागीदारी।'
      ] : [
        'Developed and tested software applications using Java and Python programming languages.',
        'Collaborated with team members to troubleshoot and resolve technical issues efficiently.',
        'Assisted in the design and implementation of user-friendly interfaces for seamless navigation.',
        'Participated in code reviews to ensure adherence to clean architecture and best coding standards.'
      ],
      skills: ['Java', 'Python', 'REST APIs', 'SQL', 'Git', 'Agile']
    }
  ];

  const educationData = [
    {
      degree: isHi ? 'बी.टेक (कंप्यूटर साइंस व इंजीनियरिंग)' : 'B.Tech in Computer Science & Engineering',
      institution: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
      location: 'Lucknow, Uttar Pradesh',
      period: '2022 - 2026 (Expected)',
      bullets: isHi ? [
        'कोर CS विषय: AI, डेटा एनालिसिस, साइबर सिक्योरिटी फंडामेंटल्स, और डेटा स्ट्रक्चर्स।',
        'एकेडमिक प्रोजेक्ट्स और सॉफ्टवेयर इंजीनियरिंग में उत्कृष्ट प्रदर्शन।'
      ] : [
        'Core curriculum in AI, Data Analysis, Cybersecurity fundamentals, and Data Structures.',
        'Focus on building real-world software applications and algorithm design.'
      ],
      skills: ['AI / ML', 'Data Structures', 'Cybersecurity', 'Database Management']
    },
    {
      degree: isHi ? 'इंटरमीडिएट (PCM)' : 'Intermediate Education (PCM)',
      institution: 'SMT Saroj Devi INT Coll Jarara Khair',
      location: 'Aligarh, Uttar Pradesh',
      period: '2019 - 2020',
      bullets: isHi ? [
        'भौतिकी, रसायन विज्ञान और गणित (PCM) स्ट्रीम में माध्यमिक शिक्षा पूर्ण।'
      ] : [
        'Completed higher secondary education with focus on Physics, Chemistry, and Mathematics.'
      ],
      skills: ['Mathematics', 'Physics', 'Analytical Problem Solving']
    },
    {
      degree: isHi ? 'हाई स्कूल (PCM)' : 'High School Education (PCM)',
      institution: 'N L G INT Coll',
      location: 'Aligarh, Uttar Pradesh',
      period: '2016 - 2017',
      bullets: isHi ? [
        'साइंस और मैथ्स स्ट्रीम में उत्कृष्ट शैक्षणिक रिकॉर्ड के साथ हाई स्कूल पूर्ण।'
      ] : [
        'Secondary education completed with strong foundation in science and mathematics.'
      ],
      skills: ['Science', 'Mathematics', 'Computer Basics']
    }
  ];

  const certificationsData = [
    {
      title: isHi ? 'हैकररैंक रोल सर्टिफिकेशन - सॉफ्टवेयर इंजीनियर' : 'HackerRank Role Certification — Software Engineer',
      issuer: 'HackerRank (CTO: Harishankaran K)',
      certId: 'F89BCD89AFE8',
      date: isHi ? '11 अक्टूबर, 2026' : '11 October, 2026',
      accent: '#00EA64',
      badge: isHi ? 'सत्यापित विशेषज्ञता' : 'Role Certified',
      description: isHi 
        ? 'समस्या समाधान, डेटा स्ट्रक्चर्स, एल्गोरिदम और सॉफ्टवेयर आर्किटेक्चर सिद्धांतों में हैकररैंक द्वारा आधिकारिक रूप से प्रमाणित।'
        : 'Officially certified by HackerRank for demonstrating strong competencies in Problem Solving, Algorithms, Data Structures, and Software Engineering Principles.',
      skills: ['Problem Solving', 'Data Structures', 'Algorithms', 'Software Engineering'],
      protectedImage: '/certificates/hackerrank_protected.webp',
      officialVerifyUrl: 'https://www.hackerrank.com/certificates/F89BCD89AFE8'
    },
    {
      title: isHi ? 'ICAT - इंटर्नशिप कॉमन एप्टीट्यूड टेस्ट' : 'ICAT — Internship Common Aptitude Test',
      issuer: 'ICAT Assessment Council',
      certId: 'CIT-P-3810557',
      date: isHi ? '12 अक्टूबर, 2026' : '12 October, 2026',
      accent: '#FF7A00',
      badge: isHi ? 'योग्यता प्रमाणन' : 'Merit Verified',
      description: isHi
        ? 'इंजीनियरिंग अभिरुचि, लॉजिकल रीजनिंग, विश्लेषणात्मक क्षमता और तकनीकी बुनियादी सिद्धांतों में उत्कृष्ट प्रदर्शन।'
        : 'Successfully completed the national assessment demonstrating high proficiency in core engineering aptitude, logical reasoning, and analytical capability.',
      skills: ['Engineering Aptitude', 'Logical Reasoning', 'Analytical Ability', 'Quantitative Analysis'],
      protectedImage: '/certificates/icat_protected.webp',
      officialVerifyUrl: null
    }
  ];

  return (
    <SectionWrapper
      id="experience"
      label={isHi ? 'अनुभव, शिक्षा व प्रमाणपत्र' : 'Experience & Credentials'}
      title={isHi ? 'शैक्षणिक व व्यावसायिक यात्रा' : 'Professional Journey & Credentials'}
      description={isHi ? 'मेरी इंटर्नशिप, शैक्षणिक पृष्ठभूमि और आधिकारिक तकनीकी प्रमाणपन्नों का विवरण।' : 'A timeline of my hands-on software engineering internship, academic qualifications, and verified industry credentials.'}
    >
      <TimelineGrid>
        {/* Left: Work Experience */}
        <div>
          <ColumnTitle>
            <FiBriefcase /> {isHi ? 'व्यावसायिक अनुभव' : 'Work History'}
          </ColumnTitle>
          <CardList>
            {experienceData.map((item, idx) => (
              <TimelineCard key={idx}>
                <CardHeader>
                  <RoleTitle>{item.role}</RoleTitle>
                  <BadgeTime>{item.period}</BadgeTime>
                </CardHeader>
                <CompanyName>{item.company}</CompanyName>
                <MetaRow>
                  <span><FiMapPin /> {item.location}</span>
                  <span><FiCalendar /> {item.period}</span>
                </MetaRow>
                <BulletList>
                  {item.bullets.map((b, bIdx) => (
                    <BulletItem key={bIdx}>
                      <FiCheckCircle size={14} />
                      <span>{b}</span>
                    </BulletItem>
                  ))}
                </BulletList>
                <TechTags>
                  {item.skills.map(s => (
                    <TechTag key={s}>{s}</TechTag>
                  ))}
                </TechTags>
              </TimelineCard>
            ))}
          </CardList>
        </div>

        {/* Right: Education */}
        <div>
          <ColumnTitle>
            <FiAward /> {isHi ? 'शिक्षा' : 'Education'}
          </ColumnTitle>
          <CardList>
            {educationData.map((item, idx) => (
              <TimelineCard key={idx}>
                <CardHeader>
                  <RoleTitle>{item.degree}</RoleTitle>
                  <BadgeTime>{item.period}</BadgeTime>
                </CardHeader>
                <CompanyName>{item.institution}</CompanyName>
                <MetaRow>
                  <span><FiMapPin /> {item.location}</span>
                </MetaRow>
                <BulletList>
                  {item.bullets.map((b, bIdx) => (
                    <BulletItem key={bIdx}>
                      <FiCheckCircle size={14} />
                      <span>{b}</span>
                    </BulletItem>
                  ))}
                </BulletList>
                <TechTags>
                  {item.skills.map(s => (
                    <TechTag key={s}>{s}</TechTag>
                  ))}
                </TechTags>
              </TimelineCard>
            ))}
          </CardList>
        </div>
      </TimelineGrid>

      {/* ── Certifications & Industry Credentials ── */}
      <CertificationsWrapper>
        <ColumnTitle>
          <FiShield /> {isHi ? 'आधिकारिक प्रमाणपत्र व क्रेडेंशियल्स' : 'Certifications & Industry Credentials'}
        </ColumnTitle>
        <CertGrid>
          {certificationsData.map((cert, cIdx) => (
            <CertCard key={cIdx} $accent={cert.accent}>
              <div>
                <CertTop>
                  <CertBadge $accent={cert.accent}>
                    <FiCheckCircle size={12} /> {cert.badge}
                  </CertBadge>
                  <MetaRow style={{ margin: 0 }}>
                    <span><FiCalendar /> {cert.date}</span>
                  </MetaRow>
                </CertTop>

                <CertTitle>{cert.title}</CertTitle>
                <CertIssuer $accent={cert.accent}>{cert.issuer}</CertIssuer>

                <CertIdBadge>
                  <span>ID:</span>
                  <strong>{cert.certId}</strong>
                </CertIdBadge>

                <CertDesc>{cert.description}</CertDesc>
              </div>

              <div>
                <TechTags>
                  {cert.skills.map(s => (
                    <TechTag key={s}>{s}</TechTag>
                  ))}
                </TechTags>

                <CertActions>
                  <CertViewBtn 
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    $accent={cert.accent}
                  >
                    <FiLock size={13} />
                    <span>{isHi ? 'सुरक्षित क्रेडेंशियल देखें' : 'View Verified Credential'}</span>
                    <FiExternalLink size={12} />
                  </CertViewBtn>
                  <AntiTamperNote>
                    <FiShield size={12} />
                    <span>Anti-Tamper Active</span>
                  </AntiTamperNote>
                </CertActions>
              </div>
            </CertCard>
          ))}
        </CertGrid>
      </CertificationsWrapper>

      {/* ── Secure Anti-Tamper & Anti-Screenshot Modal Viewer ── */}
      {activeCert && (
        <ProtectedCertificateModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </SectionWrapper>
  );
}

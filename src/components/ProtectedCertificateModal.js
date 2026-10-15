'use client';
import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiShield, FiLock, FiX, FiCheckCircle, FiExternalLink, FiAlertTriangle, FiEyeOff } from 'react-icons/fi';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 234, 100, 0.25); }
  50% { box-shadow: 0 0 35px rgba(0, 234, 100, 0.5); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 10, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  animation: ${fadeIn} 0.25s ease-out;
  user-select: none;
  -webkit-user-select: none;
`;

const ModalContainer = styled.div`
  background: #0d0f17;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  max-width: 960px;
  width: 100%;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 234, 100, 0.15);
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(18, 22, 34, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  gap: 1rem;
  flex-wrap: wrap;
`;

const SecurityHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ShieldIconBadge = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(0, 234, 100, 0.12);
  border: 1px solid rgba(0, 234, 100, 0.35);
  color: #00ea64;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderMainTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.02em;
`;

const SecurityTag = styled.span`
  background: rgba(0, 234, 100, 0.15);
  color: #00ea64;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 234, 100, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const HeaderSubtitle = styled.div`
  font-size: 0.75rem;
  color: #94a3b8;
  font-family: monospace;
`;

const CloseBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    color: #ef4444;
    transform: rotate(90deg);
  }
`;

const ViewportContainer = styled.div`
  position: relative;
  background: #07090e;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  min-height: 420px;
  max-height: calc(92vh - 145px);

  @media (max-width: 768px) {
    padding: 0.75rem;
    min-height: 300px;
  }
`;

const ImageStage = styled.div`
  position: relative;
  max-width: 100%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #000;
  transition: filter 0.2s ease;

  ${({ $isBlurred }) =>
    $isBlurred &&
    css`
      filter: blur(28px) grayscale(90%);
    `}
`;

const CertificateImage = styled.img`
  display: block;
  width: 100%;
  max-height: 68vh;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
`;

// Dynamic Diagonal Watermark Grid across image
const WatermarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  overflow: hidden;
  opacity: 0.35;
  mix-blend-mode: overlay;

  span {
    transform: rotate(-30deg);
    font-size: 0.72rem;
    font-family: monospace;
    font-weight: 800;
    color: #ffffff;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
    letter-spacing: 0.12em;
  }
`;

// Scanline cyber security effect
const ScanlineBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 234, 100, 0.7), transparent);
  pointer-events: none;
  animation: ${scanline} 6s linear infinite;
`;

// Transparent click-interceptor shield
const ClickShield = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  background: transparent;
  cursor: default;
`;

// Inactivity / Screen capture privacy curtain
const PrivacyShieldCurtain = styled.div`
  position: absolute;
  inset: 0;
  z-index: 20;
  background: rgba(10, 12, 18, 0.94);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  color: #fff;
  animation: ${fadeIn} 0.2s ease;
`;

const PrivacyIconWrapper = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
`;

const PrivacyTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
  color: #f1f5f9;
`;

const PrivacyText = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  max-width: 440px;
  line-height: 1.5;
  margin: 0;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.5rem;
  background: rgba(14, 18, 28, 0.98);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ProtectionNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: #94a3b8;

  svg {
    color: #f59e0b;
    flex-shrink: 0;
  }
`;

const VerifyExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1.1rem;
  background: rgba(0, 234, 100, 0.15);
  border: 1px solid rgba(0, 234, 100, 0.4);
  color: #00ea64;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    background: #00ea64;
    color: #000;
    box-shadow: 0 4px 15px rgba(0, 234, 100, 0.4);
    transform: translateY(-1px);
  }
`;

const ToastAlert = styled.div`
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(220, 38, 38, 0.95);
  color: #fff;
  padding: 0.65rem 1.2rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.2s ease;
`;

export default function ProtectedCertificateModal({ cert, onClose }) {
  const [isWindowInactive, setIsWindowInactive] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showSecurityToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  useEffect(() => {
    // 1. Inactivity & Window Blur Shield (Anti-Snipping Tool)
    const handleBlur = () => {
      setIsWindowInactive(true);
    };

    const handleFocus = () => {
      setIsWindowInactive(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowInactive(true);
      } else {
        setIsWindowInactive(false);
      }
    };

    // 2. Keyboard Interception (PrintScreen, Ctrl+P, Ctrl+S, Ctrl+U, F12)
    const handleKeyDown = (e) => {
      // ESC closes modal safely
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // PrintScreen Interception
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('🔒 Privacy Notice: Direct screen capture of Ritesh Kumar’s verified credentials is restricted.');
          }
        } catch (err) {}
        setIsWindowInactive(true);
        showSecurityToast('⚠️ Screen capture restricted: Document protected by digital anti-tamper watermark.');
        setTimeout(() => setIsWindowInactive(false), 2000);
        return;
      }

      // Ctrl/Cmd + P (Print / Save PDF)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        showSecurityToast('🔒 Printing and PDF export are disabled for privacy protection.');
        return;
      }

      // Ctrl/Cmd + S (Save Page / Save Image)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showSecurityToast('🔒 Saving document is disabled to safeguard credentials.');
        return;
      }

      // Ctrl/Cmd + U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C / F12 (DevTools)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
        showSecurityToast('🛡️ Developer inspection blocked for credential privacy.');
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keydown', handleKeyDown);

    // Prevent body scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!cert) return null;

  const handleContextMenu = (e) => {
    e.preventDefault();
    showSecurityToast('🔒 Right-click and image download are disabled.');
  };

  const watermarkText = `RITESH KUMAR • ${cert.certId || 'VERIFIED'} • NOT FOR DUPLICATION`;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()} onContextMenu={handleContextMenu}>
        {toastMessage && (
          <ToastAlert>
            <FiAlertTriangle /> {toastMessage}
          </ToastAlert>
        )}

        {/* ── Header ── */}
        <ModalHeader>
          <SecurityHeaderLeft>
            <ShieldIconBadge>
              <FiShield />
            </ShieldIconBadge>
            <HeaderTitleGroup>
              <HeaderMainTitle>
                <span>{cert.title}</span>
                <SecurityTag>
                  <FiCheckCircle size={10} style={{ marginRight: 3 }} /> Tamper-Proof
                </SecurityTag>
              </HeaderMainTitle>
              <HeaderSubtitle>
                ISSUED TO: RITESH KUMAR &nbsp;|&nbsp; CREDENTIAL ID: {cert.certId}
              </HeaderSubtitle>
            </HeaderTitleGroup>
          </SecurityHeaderLeft>
          <CloseBtn onClick={onClose} title="Close (Esc)">
            <FiX size={20} />
          </CloseBtn>
        </ModalHeader>

        {/* ── Protected Viewport ── */}
        <ViewportContainer>
          <ImageStage $isBlurred={isWindowInactive}>
            <CertificateImage
              src={cert.protectedImage}
              alt={cert.title}
              draggable={false}
              onContextMenu={handleContextMenu}
              onDragStart={(e) => e.preventDefault()}
            />

            {/* Dynamic Watermark Grid */}
            <WatermarkOverlay>
              {Array.from({ length: 12 }).map((_, idx) => (
                <span key={idx}>{watermarkText}</span>
              ))}
            </WatermarkOverlay>

            <ScanlineBar />

            {/* Transparent click shield prevents context menu / dragging */}
            <ClickShield onContextMenu={handleContextMenu} onDragStart={(e) => e.preventDefault()} />
          </ImageStage>

          {/* Privacy Curtain when window loses focus (e.g. Snipping tool active) */}
          {isWindowInactive && (
            <PrivacyShieldCurtain>
              <PrivacyIconWrapper>
                <FiEyeOff />
              </PrivacyIconWrapper>
              <PrivacyTitle>Privacy Shield Active</PrivacyTitle>
              <PrivacyText>
                Document preview is hidden while external capture utilities or secondary windows are active to protect credential integrity.
              </PrivacyText>
            </PrivacyShieldCurtain>
          )}
        </ViewportContainer>

        {/* ── Footer ── */}
        <ModalFooter>
          <ProtectionNotice>
            <FiLock size={14} />
            <span>
              This credential is encrypted with visual anti-tamper watermarks. Direct download, printing, and screenshot capture are restricted.
            </span>
          </ProtectionNotice>

          {cert.officialVerifyUrl ? (
            <VerifyExternalLink
              href={cert.officialVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiCheckCircle size={14} />
              <span>Verify on Issuer Registry</span>
              <FiExternalLink size={12} />
            </VerifyExternalLink>
          ) : (
            <SecurityTag style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
              ✓ Authenticity Sealed: #{cert.certId}
            </SecurityTag>
          )}
        </ModalFooter>
      </ModalContainer>
    </ModalBackdrop>
  );
}

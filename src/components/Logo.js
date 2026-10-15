'use client';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ $width }) => $width || '45px'};
  height: ${({ $width }) => $width || '45px'};
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease;
  user-select: none;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 12px rgba(255, 90, 30, 0.45));
    transition: transform 0.35s ease, filter 0.35s ease;
  }

  &:hover {
    transform: scale(1.1) rotate(2deg);
    
    img {
      filter: drop-shadow(0 0 20px rgba(255, 90, 30, 0.85)) drop-shadow(0 0 35px rgba(234, 88, 12, 0.4));
    }
  }
`;

export default function Logo({ width, className }) {
  return (
    <LogoContainer className={className} $width={width}>
      <img
        src="/rk-logo-transparent.png"
        alt="Ritesh Kumar RK Logo"
        width={70}
        height={70}
        loading="eager"
      />
    </LogoContainer>
  );
}

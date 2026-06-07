'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: ${({ theme }) => theme.transition};

  &:after {
    display: none !important;
  }

  &:hover {
    opacity: 0.85;
  }
`;

const LogoMark = styled.svg`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps): React.ReactElement => (
  <LogoLink href="/" aria-label="home" className={className}>
    {/* Custom abstract "SY" monogram — two overlapping geometric shapes */}
    <LogoMark
      id="logo"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>SY Monogram</title>
      {/* Background circle */}
      <circle cx="18" cy="18" r="16" fill="rgba(127,90,240,0.12)" stroke="rgba(127,90,240,0.4)" strokeWidth="1.5" />
      {/* S shape */}
      <path
        d="M13 13.5C13 12.1 14.1 11 15.5 11H20.5C21.9 11 23 12.1 23 13.5C23 14.9 21.9 16 20.5 16H15.5C14.1 16 13 17.1 13 18.5C13 19.9 14.1 21 15.5 21H20.5C21.9 21 23 22.1 23 23.5"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="logoGrad" x1="13" y1="11" x2="23" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7f5af0" />
          <stop offset="1" stopColor="#f5a623" />
        </linearGradient>
      </defs>
    </LogoMark>
    <LogoText>
      sy<span>.</span>
    </LogoText>
  </LogoLink>
);

export default Logo;

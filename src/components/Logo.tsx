'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const LogoLink = styled(Link)`
  color: ${({ theme }) => theme.colors.green};
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    svg {
      transform: scale(1.05);
    }
  }

  svg {
    transition: ${({ theme }) => theme.transition};
    width: 100%;
    height: 100%;
  }
`;

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps): React.ReactElement => (
  <LogoLink href="/" aria-label="home" className={className}>
    <svg
      id="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
    >
      <title>Logo</title>
      <g>
        <text
          x="50"
          y="67"
          fill="currentColor"
          fontFamily="'SF Mono', 'Fira Code', monospace"
          fontSize="50"
          fontWeight="600"
          textAnchor="middle"
        >
          S
        </text>
        <path
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"
          fill="none"
        />
      </g>
    </svg>
  </LogoLink>
);

export default Logo;

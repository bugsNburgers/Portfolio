'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

const { colors, fonts, fontSizes, sizes, media } = theme;

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 80px 24px 40px;
  background-color: ${colors.navy};
  text-align: center;

  @media ${media.md} {
    padding: 60px 16px 30px;
  }
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
`;

const StyledHomeButton = styled(Link)`
  color: ${colors.green};
  background-color: transparent;
  border: 1px solid ${colors.green};
  border-radius: ${sizes.borderRadius};
  padding: 0.65rem 1.25rem;
  font-size: ${fontSizes.sm};
  font-family: ${fonts.mono};
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${colors.greenTint};
  }

  &:after {
    display: none !important;
  }
`;

const DownloadButton = styled.a`
  color: ${colors.darkNavy} !important;
  background: linear-gradient(135deg, ${colors.green}, #64ffda);
  border-radius: ${sizes.borderRadius};
  padding: 0.65rem 1.25rem;
  font-size: ${fontSizes.sm};
  font-family: ${fonts.sans};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
  }

  &:after {
    display: none !important;
  }
`;

const PDFViewerContainer = styled.div`
  width: 100%;
  max-width: 960px;
  height: 82vh;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${colors.lightNavy};
  background: #1e1e24;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default function ResumePage(): React.ReactElement {
  return (
    <StyledMainContainer>
      <HeaderBar>
        <StyledHomeButton href="/">← Back to Portfolio</StyledHomeButton>
        <DownloadButton href="/Resume.pdf" download="Suprateek_Yawagal_Resume.pdf">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        </DownloadButton>
      </HeaderBar>

      <PDFViewerContainer>
        <iframe
          src="/Resume.pdf"
          title="Suprateek Yawagal Resume"
        />
      </PDFViewerContainer>
    </StyledMainContainer>
  );
}

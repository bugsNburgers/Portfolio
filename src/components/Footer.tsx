'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import IconGitHub from '@/components/IconGitHub';
import IconLinkedIn from '@/components/IconLinkedIn';
import config from '@/data/config';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 32px 40px;
    border-top: 1px solid ${theme.colors.border};
    margin-top: 40px;

    @media ${theme.media.md} {
      padding: 24px 20px;
    }
  `}
`;

const FooterTop = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 900px;
    gap: 24px;

    @media ${theme.media.sm} {
      flex-direction: column;
      text-align: center;
    }
  `}
`;

const FooterBrand = styled.a`
  ${({ theme }) => css`
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    font-weight: 600;
    color: ${theme.colors.textPrimary};
    text-decoration: none;
    letter-spacing: -0.02em;
    transition: ${theme.transition};

    span {
      background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &:hover {
      opacity: 0.8;
    }

    &:after {
      display: none !important;
    }
  `}
`;

const FooterLinks = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 8px;
  `}
`;

const SocialLink = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.textMuted};
    transition: ${theme.transition};

    &:hover {
      color: ${theme.colors.accent};
      border-color: ${theme.colors.accent};
      background: ${theme.colors.accentGlow};
      transform: translateY(-2px);
    }

    &:after {
      display: none !important;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  `}
`;

const VibesLink = styled.a`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    color: ${theme.colors.textFaint};
    text-decoration: none;
    transition: ${theme.transition};
    letter-spacing: 0.04em;

    &:hover {
      color: ${theme.colors.textSecondary};
    }

    &:after {
      display: none !important;
    }
  `}
`;

const FooterBottom = styled.div`
  ${({ theme }) => css`
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    color: ${theme.colors.textFaint};
    text-align: center;
    letter-spacing: 0.02em;
  `}
`;

// ------------------------------------------------------------------
// Icon map
// ------------------------------------------------------------------

const iconMap: Record<string, React.ReactElement> = {
  GitHub: <IconGitHub />,
  LinkedIn: <IconLinkedIn />,
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Footer = (): React.ReactElement => {
  const { socialLinks } = config;
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <FooterTop>
        <FooterBrand href="https://suprateekyawagal.in">
          suprateek<span>.</span>
        </FooterBrand>

        <FooterLinks>
          {socialLinks
            .filter(({ name }) => iconMap[name])
            .map(({ name, url }) => (
              <SocialLink
                key={name}
                href={url}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {iconMap[name]}
              </SocialLink>
            ))}

          <VibesLink
            href="https://vibes.suprateekyawagal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            not in the readme ↗
          </VibesLink>
        </FooterLinks>
      </FooterTop>

      <FooterBottom>
        © {year} Suprateek Yawagal · Designed &amp; built from scratch
      </FooterBottom>
    </StyledFooter>
  );
};

export default Footer;

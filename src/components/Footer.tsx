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
    gap: 0;
    padding: 0 40px;

    @media ${theme.media.md} {
      padding: 0 20px;
    }
  `}
`;

const SocialLinks = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 10px 0;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      color: ${theme.colors.lightSlate};
      transition: ${theme.transition};

      &:hover,
      &:focus {
        color: ${theme.colors.green};
        transform: translateY(-3px);
      }

      &:after {
        display: none !important;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  `}
`;

// "not in the readme" — centered, more visible
const VibesLink = styled.a`
  ${({ theme }) => css`
    display: block;
    padding: 10px;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.lightSlate};
    text-decoration: none;
    text-align: center;
    transition: ${theme.transition};
    letter-spacing: 0.05em;

    &:hover,
    &:focus {
      color: ${theme.colors.green};
      transform: translateY(-3px);
    }

    &:after {
      display: none !important;
    }
  `}
`;

const Credit = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 70px;
    padding: 15px;
    text-align: center;

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      line-height: 1;
      color: ${theme.colors.lightSlate};
      text-decoration: none;
      transition: ${theme.transition};
      padding: 10px;

      &:hover,
      &:focus {
        color: ${theme.colors.green};
      }

      &:after {
        display: none !important;
      }
    }
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
      <SocialLinks>
        {socialLinks
          .filter(({ name }) => iconMap[name])
          .map(({ name, url }) => (
            <a
              key={name}
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {iconMap[name]}
            </a>
          ))}
      </SocialLinks>

      <VibesLink
        href="https://vibes.suprateekyawagal.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Not in the README"
      >
        not in the readme ↗
      </VibesLink>

      <Credit>
        <a
          href="https://suprateekyawagal.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed &amp; Built by Suprateek Yawagal
        </a>
      </Credit>
    </StyledFooter>
  );
};

export default Footer;

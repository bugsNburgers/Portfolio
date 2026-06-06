'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import IconGitHub from '@/components/IconGitHub';
import IconLinkedIn from '@/components/IconLinkedIn';
import IconTwitter from '@/components/IconTwitter';
import config from '@/data/config';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: auto;
    min-height: 70px;
    padding: 15px;
    text-align: center;
    background-color: transparent;
  `}
`;

const StyledDivider = styled.hr`
  ${({ theme }) => css`
    width: calc(100% - 160px);
    max-width: 900px;
    border: none;
    border-top: 1px solid ${theme.colors.lightestNavy};
    margin: 0 auto 30px;
    opacity: 0.5;

    @media ${theme.media.lg} {
      width: calc(100% - 120px);
    }

    @media ${theme.media.md} {
      width: calc(100% - 40px);
      margin-bottom: 20px;
    }
  `}
`;

const StyledNotInReadme = styled.div`
  ${({ theme }) => css`
    margin-bottom: 20px;

    a.not-in-readme-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: ${theme.colors.green};
      background-color: transparent;
      border: 1px solid ${theme.colors.green};
      border-radius: ${theme.sizes.borderRadius};
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.sm};
      line-height: 1;
      padding: 1.25rem 1.75rem;
      text-decoration: none;
      transition: ${theme.transition};

      &:hover,
      &:focus-visible {
        background-color: ${theme.colors.greenTint};
        &:after {
          content: ' →';
        }
      }

      &:after {
        display: inline !important;
        content: '';
      }
    }

    p.subtitle {
      margin-top: 10px;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.darkSlate};
      letter-spacing: 0.05em;
    }
  `}
`;

const StyledSocialLinks = styled.div`
  ${({ theme }) => css`
    display: none;
    margin-bottom: 10px;

    @media ${theme.media.md} {
      display: block;
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      margin: 0 0 10px;
      list-style: none;
      gap: 15px;

      a {
        padding: 10px;
        color: ${theme.colors.lightSlate};
        transition: ${theme.transition};

        &:hover,
        &:focus {
          color: ${theme.colors.green};
          transform: translateY(-3px);
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  `}
`;

const StyledCredit = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.lightSlate};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    line-height: 1;

    a {
      padding: 10px;
      color: ${theme.colors.lightSlate};
      transition: ${theme.transition};

      &:hover,
      &:focus {
        color: ${theme.colors.green};
      }
    }

    p {
      margin: 5px 0 0;
      color: ${theme.colors.darkSlate};
      font-size: ${theme.fontSizes.xxs};
    }
  `}
`;

// ------------------------------------------------------------------
// Icon map
// ------------------------------------------------------------------

const iconMap: Record<string, React.ReactElement> = {
  GitHub: <IconGitHub />,
  LinkedIn: <IconLinkedIn />,
  Twitter: <IconTwitter />,
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Footer = (): React.ReactElement => {
  const { socialLinks } = config;

  return (
    <StyledFooter>
      <StyledDivider />

      <StyledNotInReadme>
        <a
          className="not-in-readme-link"
          href="https://vibes.suprateekyawagal.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Not in the README
        </a>
        <p className="subtitle">music · anime · cats — the parts that don&apos;t make it to the CV</p>
      </StyledNotInReadme>

      <StyledSocialLinks>
        <ul>
          {socialLinks.map(({ name, url }) => (
            <li key={name}>
              <a
                href={url}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {iconMap[name] ?? null}
              </a>
            </li>
          ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit>
        <a
          href="https://github.com/bugsNburgers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed &amp; Built by Suprateek Yawagal
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;

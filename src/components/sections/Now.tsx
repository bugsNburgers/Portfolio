'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import nowData from '@/data/now';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeUpVariants } from '@/styles/TransitionStyles';
import type { NowCard } from '@/types';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledNowSection = styled.section`
  ${({ theme }) => css`
    max-width: 900px;
  `}
`;

const StyledGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;

    @media ${theme.media.md} {
      grid-template-columns: 1fr;
    }
  `}
`;

const StyledCard = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightNavy};
    border-radius: ${theme.sizes.borderRadius};
    border-left: 3px solid ${theme.colors.green};
    padding: 1.5rem;
    transition: ${theme.transition};
    box-shadow: 0 10px 30px -15px ${theme.colors.navyShadow};

    &:hover,
    &:focus-within {
      transform: translateY(-5px);
      box-shadow: 0 20px 30px -15px ${theme.colors.navyShadow};
    }

    .category {
      display: block;
      text-transform: uppercase;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.green};
      letter-spacing: 0.1em;
      margin-bottom: 10px;
    }

    h3 {
      font-size: ${theme.fontSizes.xl};
      color: ${theme.colors.lightestSlate};
      font-weight: 600;
      margin: 0 0 10px;
    }

    p {
      font-size: ${theme.fontSizes.md};
      color: ${theme.colors.slate};
      line-height: 1.5;
      margin: 0;
    }
  `}
`;

const StyledFooterLine = styled.p`
  ${({ theme }) => css`
    margin-top: 30px;
    text-align: center;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.darkSlate};

    a {
      color: ${theme.colors.green};
      text-decoration: none;
      transition: ${theme.transition};

      &:hover,
      &:focus {
        text-decoration: underline;
      }

      &:after {
        display: none;
      }
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Now = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { cards, updatedDate } = nowData;

  return (
    <StyledNowSection id="now" ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={fadeUpVariants}
      >
        <h2 className="numbered-heading">What I&apos;m Up To Now</h2>

        <StyledGrid>
          {cards.map(({ category, title, description }: NowCard) => (
            <StyledCard key={title}>
              <span className="category">{category}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </StyledCard>
          ))}
        </StyledGrid>


      </motion.div>
    </StyledNowSection>
  );
};

export default Now;

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
    max-width: ${theme.sizes.sectionMaxWidth};
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
    background-color: ${theme.colors.bgSurface};
    border-radius: ${theme.sizes.borderRadius};
    border: 1px solid ${theme.colors.border};
    border-top: 2px solid ${theme.colors.accent};
    padding: 1.5rem;
    transition: ${theme.transition};
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

    &:hover,
    &:focus-within {
      transform: translateY(-5px);
      border-top-color: ${theme.colors.secondary};
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    }

    .category {
      display: block;
      text-transform: uppercase;
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.accent};
      letter-spacing: 0.1em;
      margin-bottom: 10px;
    }

    h3 {
      font-size: ${theme.fontSizes.lg};
      color: ${theme.colors.textPrimary};
      font-weight: 600;
      margin: 0 0 10px;
      letter-spacing: -0.01em;
    }

    p {
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.textSecondary};
      line-height: 1.6;
      margin: 0;
    }
  `}
`;



// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Now = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { cards } = nowData;

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

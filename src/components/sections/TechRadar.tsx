'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { techRadarData, categories } from '@/data/techRadar';
import type { TechCategory } from '@/data/techRadar';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components — clean tech grid, no proficiency rings
// ------------------------------------------------------------------

const StyledSection = styled.section`
  ${({ theme }) => css`
    max-width: ${theme.sizes.sectionMaxWidth};
  `}
`;

// Tab filter — styled like Brittany's experience tabs but horizontal
const TabList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    margin-bottom: 40px;
    border-bottom: 1px solid ${theme.colors.lightestNavy};
  `}
`;

const Tab = styled.button<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    display: flex;
    align-items: center;
    padding: 12px 20px;
    background: transparent;
    border: none;
    border-bottom: 2px solid ${$active ? theme.colors.green : 'transparent'};
    color: ${$active ? theme.colors.green : theme.colors.slate};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: ${theme.transition};
    margin-bottom: -1px;
    white-space: nowrap;

    &:hover {
      color: ${theme.colors.green};
      background: ${theme.colors.greenTint};
    }
  `}
`;

// Skills grid — clean chip display
const SkillsGrid = styled(motion.div)`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `}
`;

const SkillChip = styled(motion.button)`
  ${({ theme }) => css`
    position: relative;
    padding: 8px 16px;
    background: ${theme.colors.lightNavy};
    border: 1px solid ${theme.colors.lightestNavy};
    border-radius: 3px;
    color: ${theme.colors.lightSlate};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    cursor: default;
    transition: ${theme.transition};
    text-align: left;

    &:hover {
      background: ${theme.colors.greenTint};
      border-color: ${theme.colors.green};
      color: ${theme.colors.green};
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const TechRadar = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'All'>('All');

  const filtered =
    activeCategory === 'All'
      ? techRadarData
      : techRadarData.filter((item) => item.category === activeCategory);

  return (
    <StyledSection id="skills" ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={blurInVariants}>
          <h2 className="numbered-heading">Technologies</h2>
        </motion.div>

        <motion.div variants={blurInVariants}>
          <TabList role="tablist">
            <Tab
              role="tab"
              $active={activeCategory === 'All'}
              onClick={() => setActiveCategory('All')}
              aria-selected={activeCategory === 'All'}
            >
              All
            </Tab>
            {categories.map((cat) => (
              <Tab
                key={cat}
                role="tab"
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                aria-selected={activeCategory === cat}
              >
                {cat}
              </Tab>
            ))}
          </TabList>
        </motion.div>

        <motion.div variants={blurInVariants}>
          <AnimatePresence mode="wait">
            <SkillsGrid
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((item) => (
                <SkillChip
                  key={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.name}
                </SkillChip>
              ))}
            </SkillsGrid>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </StyledSection>
  );
};

export default TechRadar;

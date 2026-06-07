'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { techRadarData, ringOrder, quadrants } from '@/data/techRadar';
import type { TechRing, TechQuadrant } from '@/data/techRadar';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledSection = styled.section`
  ${({ theme }) => css`
    max-width: 900px;
  `}
`;

// Quadrant filter pills
const QuadrantFilter = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  `}
`;

const FilterPill = styled.button<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    padding: 6px 16px;
    border-radius: 100px;
    border: 1px solid ${$active ? theme.colors.accent : theme.colors.border};
    background: ${$active ? theme.colors.accentGlow : 'transparent'};
    color: ${$active ? theme.colors.accent : theme.colors.textMuted};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    cursor: pointer;
    transition: ${theme.transition};
    letter-spacing: 0.04em;

    &:hover {
      border-color: ${theme.colors.accent};
      color: ${theme.colors.accent};
    }
  `}
`;

// Ring groupings
const RingGroup = styled.div`
  ${({ theme }) => css`
    margin-bottom: 28px;

    &:last-child {
      margin-bottom: 0;
    }
  `}
`;

const RingLabel = styled.div<{ $ring: TechRing }>`
  ${({ theme, $ring }) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;

    .ring-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      background: ${
        $ring === 'Expert'
          ? `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary})`
          : $ring === 'Proficient'
          ? theme.colors.accent
          : theme.colors.border
      };
      box-shadow: ${
        $ring === 'Expert' ? `0 0 8px ${theme.colors.accentGlow}` : 'none'
      };
    }

    .ring-name {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xs};
      color: ${
        $ring === 'Expert'
          ? theme.colors.accent
          : $ring === 'Proficient'
          ? theme.colors.textSecondary
          : theme.colors.textFaint
      };
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .ring-line {
      flex: 1;
      height: 1px;
      background: ${theme.colors.border};
      opacity: 0.5;
    }
  `}
`;

const TechChips = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-left: 18px;
  `}
`;

const TechChip = styled.button<{ $ring: TechRing }>`
  ${({ theme, $ring }) => css`
    position: relative;
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid ${
      $ring === 'Expert'
        ? `rgba(127, 90, 240, 0.4)`
        : $ring === 'Proficient'
        ? theme.colors.border
        : `${theme.colors.border}80`
    };
    background: ${
      $ring === 'Expert'
        ? theme.colors.accentGlow
        : $ring === 'Proficient'
        ? theme.colors.bgSurface
        : 'transparent'
    };
    color: ${
      $ring === 'Expert'
        ? theme.colors.accentLight
        : $ring === 'Proficient'
        ? theme.colors.textSecondary
        : theme.colors.textFaint
    };
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    font-weight: ${$ring === 'Expert' ? '500' : '400'};
    cursor: pointer;
    transition: ${theme.transition};
    text-align: left;

    &:hover {
      border-color: ${theme.colors.accent};
      color: ${theme.colors.accent};
      background: ${theme.colors.accentGlow};
      transform: translateY(-1px);
    }
  `}
`;

// Tooltip
const Tooltip = styled(motion.div)`
  ${({ theme }) => css`
    position: fixed;
    background: ${theme.colors.bgElevated};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.sizes.borderRadiusSm};
    padding: 8px 12px;
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xxs};
    color: ${theme.colors.textSecondary};
    max-width: 200px;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    line-height: 1.5;
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const TechRadar = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeQuadrant, setActiveQuadrant] = useState<TechQuadrant | 'All'>('All');
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const filtered = techRadarData.filter(
    (item) => activeQuadrant === 'All' || item.quadrant === activeQuadrant,
  );

  const handleMouseEnter = (e: React.MouseEvent, description: string) => {
    if (!description) return;
    setTooltip({
      text: description,
      x: e.clientX + 12,
      y: e.clientY - 8,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip) {
      setTooltip((prev) => prev && { ...prev, x: e.clientX + 12, y: e.clientY - 8 });
    }
  };

  return (
    <StyledSection id="skills" ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={blurInVariants}>
          <h2 className="numbered-heading">Tech Radar</h2>
        </motion.div>

        <motion.div variants={blurInVariants}>
          <QuadrantFilter>
            <FilterPill
              $active={activeQuadrant === 'All'}
              onClick={() => setActiveQuadrant('All')}
            >
              All
            </FilterPill>
            {quadrants.map((q) => (
              <FilterPill
                key={q}
                $active={activeQuadrant === q}
                onClick={() => setActiveQuadrant(q)}
              >
                {q}
              </FilterPill>
            ))}
          </QuadrantFilter>
        </motion.div>

        <motion.div variants={blurInVariants}>
          {ringOrder.map((ring) => {
            const items = filtered.filter((item) => item.ring === ring);
            if (items.length === 0) return null;

            return (
              <RingGroup key={ring}>
                <RingLabel $ring={ring}>
                  <span className="ring-dot" />
                  <span className="ring-name">{ring}</span>
                  <span className="ring-line" />
                </RingLabel>

                <TechChips>
                  {items.map((item) => (
                    <TechChip
                      key={item.name}
                      $ring={ring}
                      onMouseEnter={(e) => item.description && handleMouseEnter(e, item.description)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setTooltip(null)}
                      onClick={() => {}}
                    >
                      {item.name}
                    </TechChip>
                  ))}
                </TechChips>
              </RingGroup>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Hover tooltip */}
      {tooltip && (
        <Tooltip
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </Tooltip>
      )}
    </StyledSection>
  );
};

export default TechRadar;

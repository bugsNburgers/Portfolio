'use client';

import React from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { featuredProjects } from '@/data/projects';
import IconGitHub from '@/components/IconGitHub';
import IconExternal from '@/components/IconExternal';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants, cardVariants } from '@/styles/TransitionStyles';
import type { FeaturedProject } from '@/types';

// ------------------------------------------------------------------
// Bento-grid styled components
// ------------------------------------------------------------------

const StyledProjectsSection = styled.section`
  ${({ theme }) => css`
    max-width: 1000px;
  `}
`;

const BentoGrid = styled(motion.div)`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    gap: 16px;

    @media ${theme.media.md} {
      grid-template-columns: 1fr;
    }
  `}
`;

// Each project card spans differently for the bento effect
const BentoCard = styled(motion.article)<{ $index: number }>`
  ${({ theme, $index }) => css`
    position: relative;
    border-radius: ${theme.sizes.borderRadius};
    overflow: hidden;
    background: ${theme.colors.bgSurface};
    border: 1px solid ${theme.colors.border};
    transition: ${theme.transition};
    display: flex;
    flex-direction: column;

    /* First card: wide */
    ${$index === 0 && css`
      grid-column: 1 / 8;

      @media ${theme.media.md} {
        grid-column: 1 / -1;
      }
    `}
    /* Second card: narrow right */
    ${$index === 1 && css`
      grid-column: 8 / -1;

      @media ${theme.media.md} {
        grid-column: 1 / -1;
      }
    `}
    /* Third card: narrow left */
    ${$index === 2 && css`
      grid-column: 1 / 5;

      @media ${theme.media.md} {
        grid-column: 1 / -1;
      }
    `}
    /* Fourth card: wide right */
    ${$index === 3 && css`
      grid-column: 5 / -1;

      @media ${theme.media.md} {
        grid-column: 1 / -1;
      }
    `}
    /* Fallback for more cards */
    ${$index >= 4 && css`
      grid-column: span 6;

      @media ${theme.media.md} {
        grid-column: 1 / -1;
      }
    `}

    &:hover {
      border-color: ${theme.colors.accent};
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${theme.colors.accentGlow};

      .project-image img {
        transform: scale(1.04);
      }

      .card-glow {
        opacity: 1;
      }
    }

    /* Top gradient accent stripe */
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.secondary});
      z-index: 2;
    }
  `}
`;

// Glow overlay on hover
const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(127, 90, 240, 0.05), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
`;

const ProjectImage = styled.div`
  ${({ theme }) => css`
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    /* Subtle overlay */
    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 50%, ${theme.colors.bgSurface} 100%);
    }
  `}
`;

const ProjectContent = styled.div`
  ${({ theme }) => css`
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;

    .project-category {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.accent};
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .project-title {
      font-size: ${theme.fontSizes.xxl};
      font-weight: 700;
      color: ${theme.colors.textPrimary};
      letter-spacing: -0.02em;
      margin: 0;
      line-height: 1.2;

      a {
        color: inherit;
        text-decoration: none;
        transition: ${theme.transition};

        &:hover {
          color: ${theme.colors.accent};
        }

        &:after {
          display: none;
        }
      }
    }

    .project-description {
      color: ${theme.colors.textSecondary};
      font-size: ${theme.fontSizes.sm};
      line-height: 1.6;
      flex: 1;

      a {
        color: ${theme.colors.accent};
        text-decoration: none;
      }
    }
  `}
`;

const ProjectFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px 16px;
    gap: 12px;
    position: relative;
    z-index: 1;
  `}
`;

const TechStack = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    span {
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.textMuted};
      background: ${theme.colors.bgElevated};
      border: 1px solid ${theme.colors.border};
      border-radius: 4px;
      padding: 2px 8px;
    }
  `}
`;

const ProjectLinks = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 8px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: ${theme.colors.textMuted};
      background: ${theme.colors.bgElevated};
      border: 1px solid ${theme.colors.border};
      transition: ${theme.transition};

      &:hover {
        color: ${theme.colors.accent};
        border-color: ${theme.colors.accent};
        transform: translateY(-2px);
      }

      &:after {
        display: none !important;
      }

      svg {
        width: 15px;
        height: 15px;
      }
    }
  `}
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Projects = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <StyledProjectsSection
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={blurInVariants}>
          <h2 className="numbered-heading">Featured Projects</h2>
        </motion.div>

        <BentoGrid
          variants={staggerContainerVariants}
        >
          {featuredProjects.map(
            ({ title, description, techStack, githubUrl, externalUrl, image, imageAlt }, i) => (
              <BentoCard key={i} $index={i} variants={cardVariants}>
                <CardGlow className="card-glow" />

                {image && (
                  <ProjectImage className="project-image">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </ProjectImage>
                )}

                <ProjectContent>
                  <span className="project-category">Featured Project</span>

                  <h3 className="project-title">
                    {externalUrl ? (
                      <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </h3>

                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </ProjectContent>

                <ProjectFooter>
                  <TechStack>
                    {techStack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </TechStack>

                  <ProjectLinks>
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        aria-label="GitHub Link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconGitHub />
                      </a>
                    )}
                    {externalUrl && (
                      <a
                        href={externalUrl}
                        aria-label="External Link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconExternal />
                      </a>
                    )}
                  </ProjectLinks>
                </ProjectFooter>
              </BentoCard>
            ),
          )}
        </BentoGrid>
      </motion.div>
    </StyledProjectsSection>
  );
};

export default Projects;

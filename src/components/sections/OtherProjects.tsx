'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import otherProjects from '@/data/otherProjects';
import IconGitHub from '@/components/IconGitHub';
import IconExternal from '@/components/IconExternal';
import IconFolder from '@/components/IconFolder';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeUpVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledOtherProjectsSection = styled.section`
  max-width: 1000px;

  .archive-link {
    display: block;
    text-align: center;
    margin: -40px 0 50px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.green};
    transition: ${({ theme }) => theme.transition};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.green};
      text-decoration: underline;
    }

    &:after {
      display: none;
    }
  }
`;

const StyledHeading = styled.h2`
  font-size: clamp(24px, 5vw, 32px);
  text-align: center;
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.lightestSlate};
`;

const StyledProjectsGrid = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  position: relative;
  margin-top: 0;
  padding: 0;
  list-style: none;
`;

const StyledProject = styled(motion.li)`
  cursor: default;
  transition: ${({ theme }) => theme.transition};

  &:hover,
  &:focus-within {
    .project-inner {
      transform: translateY(-7px);
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    box-shadow: 0 10px 30px -15px ${({ theme }) => theme.colors.navyShadow};
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    background-color: ${({ theme }) => theme.colors.lightNavy};
    transition: ${({ theme }) => theme.transition};
  }

  .project-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
  }

  .folder {
    color: ${({ theme }) => theme.colors.green};

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: -10px;
    color: ${({ theme }) => theme.colors.lightSlate};

    a {
      display: flex;
      align-items: center;
      padding: 5px 7px;
      color: ${({ theme }) => theme.colors.lightSlate};
      transition: ${({ theme }) => theme.transition};

      &:hover,
      &:focus {
        color: ${({ theme }) => theme.colors.green};
      }

      svg {
        width: 19px;
        height: 19px;
      }

      &:after {
        display: none;
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: ${({ theme }) => theme.colors.lightestSlate};
    font-size: ${({ theme }) => theme.fontSizes.xxl};

    a {
      position: static;
      color: inherit;
      text-decoration: none;
      transition: ${({ theme }) => theme.transition};

      &:hover,
      &:focus {
        color: ${({ theme }) => theme.colors.green};
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      &:after {
        display: none;
      }
    }
  }

  .project-description {
    color: ${({ theme }) => theme.colors.lightSlate};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.5;
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0;
    list-style: none;
    gap: 10px;

    li {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: ${({ theme }) => theme.fontSizes.xxs};
      color: ${({ theme }) => theme.colors.slate};
      line-height: 1.75;
    }
  }
`;

const StyledMoreButton = styled.button`
  display: block;
  margin: 80px auto 0;
  color: ${({ theme }) => theme.colors.green};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  padding: 1.25rem 1.75rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  line-height: 1;
  text-decoration: none;
  transition: ${({ theme }) => theme.transition};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.greenTint};
    outline: none;
  }
`;

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------

const GRID_LIMIT = 6;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const OtherProjects = (): React.ReactElement => {
  const [showMore, setShowMore] = useState(false);
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();

  const projectsToShow = showMore ? otherProjects : otherProjects.slice(0, GRID_LIMIT);
  const hasMore = otherProjects.length > GRID_LIMIT;

  return (
    <StyledOtherProjectsSection ref={ref as React.RefObject<HTMLElement>}>
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={fadeUpVariants}
      >
        <StyledHeading>Other Noteworthy Projects</StyledHeading>

        <a className="archive-link" href="/archive">
          view the archive
        </a>
      </motion.div>

      <StyledProjectsGrid
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        {projectsToShow.map(({ title, description, techStack, githubUrl, externalUrl }, i) => (
          <StyledProject key={i} variants={fadeUpVariants}>
            <div className="project-inner">
              <header className="project-top">
                <div className="folder">
                  <IconFolder />
                </div>

                <div className="project-links">
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
                </div>
              </header>

              <div className="project-title">
                {externalUrl ? (
                  <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                ) : (
                  <span>{title}</span>
                )}
              </div>

              <p className="project-description">{description}</p>

              <ul className="project-tech-list">
                {techStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </StyledProject>
        ))}
      </StyledProjectsGrid>

      {hasMore && (
        <StyledMoreButton onClick={() => setShowMore((v) => !v)}>
          {showMore ? 'Show Less' : 'Show More'}
        </StyledMoreButton>
      )}
    </StyledOtherProjectsSection>
  );
};

export default OtherProjects;

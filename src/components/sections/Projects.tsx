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
import { fadeUpVariants } from '@/styles/TransitionStyles';
import type { FeaturedProject } from '@/types';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledProjectsSection = styled.section`
  ${({ theme }) => css`
    max-width: 1000px;
  `}
`;

const StyledProjectsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const StyledProject = styled.li`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: 100px;

      @media ${theme.media.md} {
        margin-bottom: 70px;
      }

      @media ${theme.media.sm} {
        margin-bottom: 30px;
      }
    }

    /* Odd: text left, image right */
    &:nth-of-type(odd) {
      .project-content {
        grid-column: 1 / 7;
        grid-row: 1 / -1;
        text-align: left;

        @media ${theme.media.md} {
          grid-column: 1 / -1;
          padding: 40px 40px 30px;
          text-align: left;
        }

        @media ${theme.media.sm} {
          padding: 25px 25px 20px;
        }
      }

      .project-image {
        grid-column: 6 / -1;
        grid-row: 1 / -1;

        @media ${theme.media.md} {
          grid-column: 1 / -1;
          opacity: 0.25;
        }
      }

      .project-tech-list,
      .project-links {
        justify-content: flex-start;
      }
    }

    /* Even: image left, text right */
    &:nth-of-type(even) {
      .project-content {
        grid-column: 7 / -1;
        grid-row: 1 / -1;
        text-align: right;

        @media ${theme.media.md} {
          grid-column: 1 / -1;
          padding: 40px 40px 30px;
          text-align: left;
        }

        @media ${theme.media.sm} {
          padding: 25px 25px 20px;
        }
      }

      .project-image {
        grid-column: 1 / 8;
        grid-row: 1 / -1;

        @media ${theme.media.md} {
          grid-column: 1 / -1;
          opacity: 0.25;
        }
      }

      .project-tech-list,
      .project-links {
        justify-content: flex-end;

        @media ${theme.media.md} {
          justify-content: flex-start;
        }
      }
    }
  `}
`;

const StyledProjectContent = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: 2;

    .project-overline {
      margin: 10px 0;
      color: ${theme.colors.green};
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xs};
      font-weight: 400;
    }

    .project-title {
      color: ${theme.colors.lightestSlate};
      font-size: clamp(24px, 5vw, 28px);
      margin: 0 0 20px;

      a {
        color: inherit;
        text-decoration: none;
        transition: ${theme.transition};

        &:hover,
        &:focus {
          color: ${theme.colors.green};
        }

        &:after {
          display: none;
        }
      }

      @media ${theme.media.md} {
        margin: 0 0 10px;
      }
    }

    .project-description {
      box-shadow: 0 10px 30px -15px ${theme.colors.navyShadow};
      background-color: ${theme.colors.lightNavy};
      border-radius: ${theme.sizes.borderRadius};
      padding: 25px;
      color: ${theme.colors.lightSlate};
      font-size: ${theme.fontSizes.lg};
      line-height: 1.5;
      transition: ${theme.transition};

      @media ${theme.media.md} {
        padding: 20px 0;
        background-color: transparent;
        box-shadow: none;
      }

      a {
        color: ${theme.colors.green};
        text-decoration: none;
      }

      strong {
        color: ${theme.colors.white};
        font-weight: 600;
      }
    }
  `}
`;

const StyledTechList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;
    gap: 15px;

    li {
      color: ${theme.colors.lightSlate};
      font-family: ${theme.fonts.mono};
      font-size: ${theme.fontSizes.xs};
      white-space: nowrap;
    }
  `}
`;

const StyledLinkIcons = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    gap: 15px;

    a {
      padding: 5px;
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

      &:after {
        display: none;
      }
    }
  `}
`;

const StyledProjectImage = styled.div`
  ${({ theme }) => css`
    box-shadow: 0 10px 30px -15px ${theme.colors.navyShadow};
    transition: ${theme.transition};
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media ${theme.media.md} {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      background-color: ${theme.colors.green};
      border-radius: ${theme.sizes.borderRadius};
      display: block;
      position: relative;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        z-index: 3;
        transition: ${theme.transition};
        background-color: ${theme.colors.navy};
        mix-blend-mode: screen;
      }

      &:after {
        display: none;
      }
    }

    .img {
      border-radius: ${theme.sizes.borderRadius};
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      transition: ${theme.transition};
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
        variants={fadeUpVariants}
      >
        <h2 className="numbered-heading">Some Things I&apos;ve Built</h2>

        <StyledProjectsList>
          {featuredProjects.map(
            ({ title, description, techStack, githubUrl, externalUrl, image, imageAlt }, i) => (
              <StyledProject key={i}>
                <StyledProjectContent className="project-content">
                  <p className="project-overline">Featured Project</p>

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

                  <StyledTechList className="project-tech-list">
                    {techStack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </StyledTechList>

                  <StyledLinkIcons className="project-links">
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
                  </StyledLinkIcons>
                </StyledProjectContent>

                <StyledProjectImage className="project-image">
                  <a
                    href={externalUrl ?? githubUrl ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                  >
                    <Image
                      className="img"
                      src={image}
                      alt={imageAlt}
                      width={700}
                      height={438}
                    />
                  </a>
                </StyledProjectImage>
              </StyledProject>
            ),
          )}
        </StyledProjectsList>
      </motion.div>
    </StyledProjectsSection>
  );
};

export default Projects;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { featuredProjects } from '@/data/projects';
import IconGitHub from '@/components/IconGitHub';
import IconExternal from '@/components/IconExternal';
import useInView from '@/hooks/useInView';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { blurInVariants, staggerContainerVariants } from '@/styles/TransitionStyles';

const StyledProjectsSection = styled.section`
  ${({ theme }) => css`
    max-width: ${theme.sizes.sectionMaxWidth};
  `}
`;

const StyledProject = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
    margin-bottom: 80px;

    @media ${theme.media.md} {
      margin-bottom: 60px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    &:nth-of-type(odd) {
      .project-content {
        grid-column: 7 / -1;
        text-align: right;

        @media ${theme.media.md} {
          grid-column: 1 / -1;
          padding: 0;
          text-align: left;
        }
      }

      .project-tech-list {
        justify-content: flex-end;

        @media ${theme.media.md} {
          justify-content: flex-start;
        }
      }

      .project-links {
        justify-content: flex-end;

        @media ${theme.media.md} {
          justify-content: flex-start;
        }
      }

      .project-image {
        grid-column: 1 / 9;
      }
    }

    &:nth-of-type(even) {
      .project-content {
        grid-column: 1 / 7;
        text-align: left;

        @media ${theme.media.md} {
          grid-column: 1 / -1;
          padding: 0;
        }
      }

      .project-image {
        grid-column: 5 / -1;
      }
    }

    .project-content {
      position: relative;
      grid-row: 1 / -1;

      @media ${theme.media.md} {
        grid-row: auto;
        background-color: transparent; /* No background color on mobile so image is visible */
        z-index: 5;
        border-radius: ${theme.sizes.borderRadius};
      }
    }

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
        color: ${theme.colors.lightestSlate};
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
    }

    .project-description {
      box-shadow: 0 10px 30px -15px ${theme.colors.navyShadow};
      transition: ${theme.transition};
      position: relative;
      z-index: 2;
      padding: 25px;
      border-radius: ${theme.sizes.borderRadius};
      background-color: ${theme.colors.lightNavy};
      color: ${theme.colors.lightSlate};
      font-size: ${theme.fontSizes.md};
      line-height: 1.6;

      &:hover,
      &:focus-within {
        box-shadow: 0 20px 30px -15px ${theme.colors.navyShadow};
      }

      a {
        display: inline-block;
        position: relative;
        color: ${theme.colors.green};
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
    }

    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      z-index: 2;
      margin: 25px 0 10px;
      padding: 0;
      list-style: none;
      gap: 20px;

      li {
        font-family: ${theme.fonts.mono};
        font-size: ${theme.fontSizes.xs};
        color: ${theme.colors.lightSlate};
        white-space: nowrap;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 10px;
      margin-left: -10px;
      color: ${theme.colors.lightestSlate};
      gap: 5px;

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
    }

    .project-image {
      grid-row: 1 / -1;
      box-shadow: 0 10px 30px -15px ${theme.colors.navyShadow};
      transition: ${theme.transition};
      position: relative;
      z-index: 1;

      @media ${theme.media.md} {
        height: 100%;
        opacity: 1; /* Fully visible on mobile */
      }

      &:hover,
      &:focus-within {
        box-shadow: 0 20px 30px -15px ${theme.colors.navyShadow};
        z-index: 10;
        
        @media ${theme.media.md} {
          opacity: 1;
        }
      }

      a {
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.green};
        border-radius: ${theme.sizes.borderRadius};
        vertical-align: middle;
        text-decoration: none;
        transition: ${theme.transition};

        &:after {
          display: none !important;
        }

        &:hover,
        &:focus {
          background: transparent;
          outline: 0;

          .img-wrapper {
            background: transparent;

            &:before {
              background: transparent;
              mix-blend-mode: normal;
            }

            img {
              filter: none;
              mix-blend-mode: normal;
            }
          }
        }
      }

      .img-wrapper {
        position: relative;
        border-radius: ${theme.sizes.borderRadius};
        overflow: hidden;
        width: 100%;
        height: 100%;

        &:before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${theme.colors.navy};
          mix-blend-mode: screen;
          z-index: 3;
          border-radius: ${theme.sizes.borderRadius};
          transition: ${theme.transition};

          @media ${theme.media.md} {
            background: transparent;
            mix-blend-mode: normal;
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1) brightness(90%);
          mix-blend-mode: multiply;
          transition: ${theme.transition};

          @media ${theme.media.md} {
            filter: none;
            mix-blend-mode: normal;
          }
        }
      }
    }
  `}
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.lightNavy} 25%,
    ${({ theme }) => theme.colors.lightestNavy} 37%,
    ${({ theme }) => theme.colors.lightNavy} 63%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
`;

// Helper component to isolate loading state for each project image
interface ProjectImageProps {
  image: string;
  imageAlt: string;
  externalUrl?: string;
  githubUrl?: string;
  title: string;
  shouldLoad: boolean;
}

const ProjectImage = ({
  image,
  imageAlt,
  externalUrl,
  githubUrl,
  title,
  shouldLoad,
}: ProjectImageProps): React.ReactElement => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="project-image">
      <a
        href={externalUrl ?? githubUrl ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-label={title}
      >
        <div className="img-wrapper">
          {shouldLoad && image && (
            <Image
              src={image}
              alt={imageAlt}
              width={700}
              height={438}
              style={{
                objectFit: 'cover',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
                position: 'relative',
                zIndex: 2,
              }}
              onLoad={() => setIsLoaded(true)}
            />
          )}
          {!isLoaded && <ImagePlaceholder />}
        </div>
      </a>
    </div>
  );
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Projects = (): React.ReactElement => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldLoad, setShouldLoad] = useState<boolean>(false);

  useEffect(() => {
    // Defer loading images until loader finishes (2.2s) and page animations complete
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

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
          <h2 className="numbered-heading">Some Things I&apos;ve Built</h2>
        </motion.div>

        <div>
          {featuredProjects.map(
            ({ title, description, techStack, githubUrl, externalUrl, image, imageAlt }, i) => (
              <StyledProject key={i}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>
                    <h3 className="project-title">
                      {externalUrl ? (
                        <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                          {title}
                        </a>
                      ) : (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                          {title}
                        </a>
                      )}
                    </h3>
                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <ul className="project-tech-list">
                      {techStack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
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
                  </div>
                </div>

                <ProjectImage
                  image={image}
                  imageAlt={imageAlt}
                  externalUrl={externalUrl}
                  githubUrl={githubUrl}
                  title={title}
                  shouldLoad={shouldLoad}
                />
              </StyledProject>
            ),
          )}
        </div>
      </motion.div>
    </StyledProjectsSection>
  );
};

export default Projects;

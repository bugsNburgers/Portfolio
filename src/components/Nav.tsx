'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import Menu from '@/components/Menu';
import config from '@/data/config';
import useScrollDirection from '@/hooks/useScrollDirection';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import {
  fadeDownVariants,
  navStaggerVariants,
} from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledHeader = styled.header<{
  $scrolled: boolean;
  $scrollDirection: 'up' | 'down' | null;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.navy};
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: ${({ theme }) => theme.transition};

  @media ${({ theme }) => theme.media.md} {
    padding: 0 25px;
  }
  @media ${({ theme }) => theme.media.sm} {
    padding: 0 15px;
  }

  height: ${({ $scrolled, theme }) =>
    $scrolled ? theme.sizes.navScrollHeight : theme.sizes.navHeight};

  box-shadow: ${({ $scrolled, theme }) =>
    $scrolled ? `0 10px 30px -10px ${theme.colors.navyShadow}` : 'none'};

  transform: ${({ $scrollDirection }) =>
    $scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)'};
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.mono};
  counter-reset: item 0;
  z-index: 12;
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.media.md} {
    display: none;
  }

  ol {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: ${({ theme }) => theme.fontSizes.xs};

      a {
        padding: 10px;
        color: ${({ theme }) => theme.colors.lightestSlate};
        transition: ${({ theme }) => theme.transition};

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: ${({ theme }) => theme.colors.green};
          font-size: ${({ theme }) => theme.fontSizes.xxs};
          text-align: right;
        }

        &:hover,
        &:focus {
          color: ${({ theme }) => theme.colors.green};
        }
      }
    }
  }

  .resume-button {
    color: ${({ theme }) => theme.colors.green};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.green};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-family: ${({ theme }) => theme.fonts.mono};
    line-height: 1;
    text-decoration: none;
    padding: 0.75rem 1rem;
    transition: ${({ theme }) => theme.transition};
    margin-left: 15px;

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.colors.greenTint};
      outline: none;
    }

    &:after {
      display: none !important;
    }
  }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

interface NavProps {
  isHome: boolean;
}

const Nav = ({ isHome }: NavProps): React.ReactElement => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollDirection = useScrollDirection();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }

    const timeout = setTimeout(
      () => {
        setIsMounted(true);
      },
      isHome ? 100 : 0,
    );

    return () => clearTimeout(timeout);
  }, [isHome, prefersReducedMotion]);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  return (
    <StyledHeader
      $scrolled={scrolled}
      $scrollDirection={menuOpen ? null : scrollDirection}
    >
      <StyledNav>
        {isMounted && (
          <motion.div
            initial={isHome && !prefersReducedMotion ? 'hidden' : 'visible'}
            animate="visible"
            variants={fadeDownVariants}
            transition={{ delay: isHome ? 0.1 : 0 }}
          >
            <Logo />
          </motion.div>
        )}

        <StyledLinks>
          {isMounted && (
            <motion.ol
              initial={isHome && !prefersReducedMotion ? 'hidden' : 'visible'}
              animate="visible"
              variants={navStaggerVariants}
            >
              {config.navLinks.map(({ name, url }) => (
                <motion.li key={name} variants={fadeDownVariants}>
                  <Link href={url}>{name}</Link>
                </motion.li>
              ))}
            </motion.ol>
          )}

          {isMounted && (
            <motion.div
              initial={isHome && !prefersReducedMotion ? 'hidden' : 'visible'}
              animate="visible"
              variants={fadeDownVariants}
              transition={{ delay: isHome ? 0.8 : 0 }}
            >
              <a
                className="resume-button"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </motion.div>
          )}
        </StyledLinks>

        <Menu menuOpen={menuOpen} toggleMenu={handleMenuToggle} />
      </StyledNav>
    </StyledHeader>
  );
};

export default Nav;

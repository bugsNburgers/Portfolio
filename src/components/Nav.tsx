'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import config from '@/data/config';
import useScrollDirection from '@/hooks/useScrollDirection';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { fadeDownVariants, navStaggerVariants } from '@/styles/TransitionStyles';

// ------------------------------------------------------------------
// Styled components — Frosted glass floating pill nav
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
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 40px;
  width: 100%;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: ${({ theme }) => theme.transition};
  height: ${({ $scrolled, theme }) =>
    $scrolled ? theme.sizes.navScrollHeight : theme.sizes.navHeight};
  transform: ${({ $scrollDirection }) =>
    $scrollDirection === 'down' ? 'translateY(-110%)' : 'translateY(0)'};

  @media ${({ theme }) => theme.media.md} {
    padding: 0 24px;
  }
  @media ${({ theme }) => theme.media.sm} {
    padding: 0 16px;
  }
`;

// The frosted glass pill container for nav links
const NavPill = styled.div<{ $scrolled: boolean }>`
  ${({ $scrolled, theme }) => css`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    border-radius: 100px;
    transition: ${theme.transition};

    ${$scrolled
      ? css`
          background: rgba(22, 22, 26, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${theme.colors.border};
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        `
      : css`
          background: transparent;
          border: 1px solid transparent;
        `}

    @media ${theme.media.md} {
      display: none;
    }
  `}
`;

const NavLink = styled(Link)`
  ${({ theme }) => css`
    position: relative;
    padding: 8px 14px;
    border-radius: 100px;
    font-family: ${theme.fonts.sans};
    font-size: ${theme.fontSizes.sm};
    font-weight: 500;
    color: ${theme.colors.textSecondary};
    text-decoration: none;
    transition: ${theme.transition};
    white-space: nowrap;

    &:after {
      display: none !important;
    }

    &:hover {
      color: ${theme.colors.textPrimary};
      background: ${theme.colors.bgElevated};
    }

    &.active {
      color: ${theme.colors.accent};
      background: ${theme.colors.accentGlow};
    }
  `}
`;

const ResumeButton = styled.a`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 100px;
    background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentLight});
    color: ${theme.colors.white};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    font-weight: 500;
    text-decoration: none;
    transition: ${theme.transition};
    cursor: pointer;
    margin-left: 8px;
    white-space: nowrap;

    &:hover,
    &:focus-visible {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px ${theme.colors.accentGlowStrong};
      color: ${theme.colors.white};
      outline: none;
    }

    &:after {
      display: none !important;
    }
  `}
`;

// Hamburger for mobile
const HamburgerButton = styled.button<{ $menuOpen: boolean }>`
  ${({ theme, $menuOpen }) => css`
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 5px;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 200;

    @media ${theme.media.md} {
      display: flex;
    }

    span {
      display: block;
      height: 2px;
      background: ${theme.colors.accent};
      border-radius: 2px;
      transition: ${theme.transition};

      &:nth-child(1) {
        width: ${$menuOpen ? '24px' : '24px'};
        transform: ${$menuOpen ? 'translateY(7px) rotate(45deg)' : 'none'};
      }
      &:nth-child(2) {
        width: 16px;
        opacity: ${$menuOpen ? 0 : 1};
        transform: ${$menuOpen ? 'scaleX(0)' : 'scaleX(1)'};
      }
      &:nth-child(3) {
        width: ${$menuOpen ? '24px' : '20px'};
        transform: ${$menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'};
      }
    }
  `}
`;

// Mobile menu overlay
const MobileMenu = styled(motion.div)`
  ${({ theme }) => css`
    display: none;
    position: fixed;
    inset: 0;
    z-index: 150;
    background: rgba(12, 12, 15, 0.97);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    @media ${theme.media.md} {
      display: flex;
    }
  `}
`;

const MobileNavLink = styled(Link)`
  ${({ theme }) => css`
    font-size: clamp(20px, 5vw, 28px);
    font-weight: 600;
    color: ${theme.colors.textSecondary};
    text-decoration: none;
    padding: 12px 24px;
    transition: ${theme.transition};
    letter-spacing: -0.02em;

    &:after {
      display: none !important;
    }

    &:hover {
      color: ${theme.colors.accent};
    }
  `}
`;

const MobileResumeButton = styled.a`
  ${({ theme }) => css`
    margin-top: 16px;
    padding: 12px 32px;
    border-radius: 100px;
    background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentLight});
    color: ${theme.colors.white};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.md};
    font-weight: 500;
    text-decoration: none;
    transition: ${theme.transition};

    &:after {
      display: none !important;
    }
  `}
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
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }
    const t = setTimeout(() => setIsMounted(true), isHome ? 100 : 0);
    return () => clearTimeout(t);
  }, [isHome, prefersReducedMotion]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('hidden', menuOpen);
    return () => document.body.classList.remove('hidden');
  }, [menuOpen]);

  return (
    <>
      <StyledHeader
        $scrolled={scrolled}
        $scrollDirection={menuOpen ? null : scrollDirection}
      >
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

        {/* Desktop: Frosted glass pill */}
        <NavPill $scrolled={scrolled}>
          {isMounted && (
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              initial={isHome && !prefersReducedMotion ? 'hidden' : 'visible'}
              animate="visible"
              variants={navStaggerVariants}
            >
              {config.navLinks.map(({ name, url }) => (
                <motion.div key={name} variants={fadeDownVariants}>
                  <NavLink href={url}>{name}</NavLink>
                </motion.div>
              ))}

              <motion.div variants={fadeDownVariants}>
                <ResumeButton
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume ↗
                </ResumeButton>
              </motion.div>
            </motion.div>
          )}
        </NavPill>

        {/* Mobile hamburger */}
        <HamburgerButton
          $menuOpen={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </HamburgerButton>
      </StyledHeader>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {config.navLinks.map(({ name, url }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <MobileNavLink href={url} onClick={() => setMenuOpen(false)}>
                  {name}
                </MobileNavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: config.navLinks.length * 0.06 + 0.05 }}
            >
              <MobileResumeButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume ↗
              </MobileResumeButton>
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

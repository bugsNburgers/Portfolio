'use client';

import React from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';
import config from '@/data/config';

// ------------------------------------------------------------------
// Animations
// ------------------------------------------------------------------

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(100%); }
`;

// ------------------------------------------------------------------
// Styled components
// ------------------------------------------------------------------

const StyledHamburgerButton = styled.button<{ $menuOpen: boolean }>`
  display: none;
  position: relative;
  z-index: 1;
  margin-right: -15px;
  padding: 15px;
  border: 0;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-timing-function: linear;
  transition-duration: 0.15s;

  @media ${({ theme }) => theme.media.md} {
    display: flex;
  }

  &:hover {
    opacity: 0.7;
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: ${({ theme }) => theme.sizes.hamburgerWidth};
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: ${({ theme }) => theme.sizes.hamburgerWidth};
    height: 2px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    background-color: ${({ theme }) => theme.colors.green};
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${({ $menuOpen }) => ($menuOpen ? '0.12s' : '0s')};
    transform: ${({ $menuOpen }) => ($menuOpen ? 'rotate(225deg)' : 'rotate(0deg)')};
    transition-timing-function: ${({ $menuOpen }) =>
      $menuOpen
        ? 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'};

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      width: ${({ theme }) => theme.sizes.hamburgerWidth};
      height: 2px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.colors.green};
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }

    &:before {
      width: ${({ $menuOpen }) => ($menuOpen ? '100%' : '120%')};
      top: ${({ $menuOpen }) => ($menuOpen ? '0' : '-10px')};
      opacity: ${({ $menuOpen }) => ($menuOpen ? 0 : 1)};
      transition: ${({ $menuOpen, theme }) =>
        $menuOpen
          ? theme.hamburgerAnimations.hamBeforeActive
          : theme.hamburgerAnimations.hamBefore};
    }

    &:after {
      width: ${({ $menuOpen }) => ($menuOpen ? '100%' : '80%')};
      bottom: ${({ $menuOpen }) => ($menuOpen ? '0' : '-10px')};
      transform: ${({ $menuOpen }) => ($menuOpen ? 'rotate(-90deg)' : 'rotate(0)')};
      transition: ${({ $menuOpen, theme }) =>
        $menuOpen
          ? theme.hamburgerAnimations.hamAfterActive
          : theme.hamburgerAnimations.hamAfter};
    }
  }
`;

const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 12;
  background: rgba(2, 12, 27, 0.7);
`;

const StyledContent = styled(Dialog.Content)<{ $menuOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 13;
  width: min(75vw, 400px);
  height: 100vh;
  outline: 0;
  background-color: ${({ theme }) => theme.colors.lightNavy};
  box-shadow: -10px 0px 30px -15px ${({ theme }) => theme.colors.navyShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${({ $menuOpen }) => ($menuOpen ? slideIn : slideOut)} 0.25s
    cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.lightestSlate};

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(${({ theme }) => theme.fontSizes.sm}, 4vw, ${({ theme }) => theme.fontSizes.lg});

      @media ${({ theme }) => theme.media.sm} {
        margin: 0 auto 10px;
      }

      a {
        display: inline-block;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: ${({ theme }) => theme.colors.lightestSlate};
        padding: 3px 20px 20px;
        transition: ${({ theme }) => theme.transition};

        &:before {
          display: block;
          counter-increment: item 0;
          content: '0' counter(item) '.';
          margin-bottom: 5px;
          color: ${({ theme }) => theme.colors.green};
          font-family: ${({ theme }) => theme.fonts.mono};
          font-size: ${({ theme }) => theme.fontSizes.sm};
          font-weight: 400;
        }

        &:hover,
        &:focus {
          color: ${({ theme }) => theme.colors.green};
        }
      }
    }
  }

  .resume-button {
    color: ${({ theme }) => theme.colors.green} !important;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.green};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    padding: 1.25rem 1.75rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: ${({ theme }) => theme.transition};
    margin-top: 10px;

    &:hover,
    &:focus,
    &:focus-visible,
    &:active {
      background-color: ${({ theme }) => theme.colors.greenTint};
      color: ${({ theme }) => theme.colors.green} !important;
      outline: none;
    }
  }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

interface MenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const Menu = ({ menuOpen, toggleMenu }: MenuProps): React.ReactElement => {
  const { navLinks } = config;

  const handleLinkClick = () => {
    if (menuOpen) toggleMenu();
  };

  return (
    <Dialog.Root open={menuOpen} onOpenChange={(open) => !open && toggleMenu()}>
      <Dialog.Trigger asChild>
        <StyledHamburgerButton
          $menuOpen={menuOpen}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent $menuOpen={menuOpen} aria-label="Navigation menu">
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <StyledNav>
            <ol>
              {navLinks.map(({ name, url }) => (
                <li key={name}>
                  <Link href={url} onClick={handleLinkClick}>
                    {name}
                  </Link>
                </li>
              ))}
            </ol>

            <a
              className="resume-button"
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              Resume
            </a>
          </StyledNav>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Menu;

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const { colors, fonts, fontSizes, sizes, media, transition } = theme;

const GlobalStyles = createGlobalStyle`
  /* ----------------------------------------------------------------
     Import Inter + JetBrains Mono from Google Fonts
  ---------------------------------------------------------------- */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  /* ----------------------------------------------------------------
     Base reset & box model
  ---------------------------------------------------------------- */
  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${colors.bgElevated} ${colors.bgBase};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* ----------------------------------------------------------------
     Scrollbar
  ---------------------------------------------------------------- */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.bgBase};
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.bgElevated};
    border-radius: 4px;
    border: 2px solid ${colors.bgBase};
  }

  /* ----------------------------------------------------------------
     Selection
  ---------------------------------------------------------------- */
  ::selection {
    background-color: ${colors.accentGlowStrong};
    color: ${colors.textPrimary};
  }

  /* ----------------------------------------------------------------
     Focus
  ---------------------------------------------------------------- */
  :focus {
    outline: 2px solid ${colors.accent};
    outline-offset: 3px;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0;
  }
  :focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 3px;
  }

  /* ----------------------------------------------------------------
     Body — gradient mesh background
  ---------------------------------------------------------------- */
  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${colors.bgBase};
    color: ${colors.textSecondary};
    font-family: ${fonts.sans};
    font-size: ${fontSizes.xl};
    line-height: 1.4;

    /* Subtle gradient mesh — unique signature feel */
    background-image:
      radial-gradient(ellipse 80% 50% at 20% 20%, rgba(127, 90, 240, 0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245, 166, 35, 0.04) 0%, transparent 60%);
    background-attachment: fixed;

    @media ${media.sm} {
      font-size: ${fontSizes.lg};
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: ${transition};
        pointer-events: none;
        user-select: none;
      }
    }
  }

  /* ----------------------------------------------------------------
     Layout shell
  ---------------------------------------------------------------- */
  #__next {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: ${sizes.maxWidth};
    min-height: 100vh;
    padding: 0 150px;

    @media ${media.lg} {
      padding: 0 100px;
    }
    @media ${media.md} {
      padding: 0 50px;
    }
    @media ${media.sm} {
      padding: 0 25px;
    }

    &.fillHeight {
      padding: 0 150px;

      @media ${media.lg} {
        padding: 0 100px;
      }
      @media ${media.md} {
        padding: 0 50px;
      }
      @media ${media.sm} {
        padding: 0 25px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 80px 0;
    max-width: ${sizes.sectionMaxWidth};

    @media ${media.md} {
      padding: 60px 0;
    }
    @media ${media.sm} {
      padding: 40px 0;
    }
  }

  /* ----------------------------------------------------------------
     Typography
  ---------------------------------------------------------------- */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: ${colors.textPrimary};
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
    letter-spacing: -0.04em;
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(36px, 7vw, 56px);
    letter-spacing: -0.03em;
  }

  /* Section headings — gradient underline style (not Brittany's numbered prefix) */
  .section-heading {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    margin: 0 0 48px;
    width: 100%;
    font-size: clamp(22px, 4vw, 28px);
    font-weight: 700;
    color: ${colors.textPrimary};
    letter-spacing: -0.02em;

    .heading-label {
      font-family: ${fonts.mono};
      font-size: ${fontSizes.xs};
      font-weight: 400;
      color: ${colors.accent};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-right: 4px;
    }

    &:after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, ${colors.border}, transparent);
      max-width: 300px;

      @media ${media.md} {
        max-width: 100%;
      }
    }
  }

  /* Legacy class — now renders same as section-heading */
  .numbered-heading {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    margin: 0 0 48px;
    width: 100%;
    font-size: clamp(22px, 4vw, 28px);
    font-weight: 700;
    color: ${colors.textPrimary};
    letter-spacing: -0.02em;

    &:before {
      display: none; /* Remove Brittany's "01." prefix */
    }

    &:after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, ${colors.border}, transparent);
      max-width: 300px;
      margin-left: 0;
      top: 0;

      @media ${media.md} {
        max-width: 100%;
      }
    }
  }

  /* ----------------------------------------------------------------
     Images & SVG
  ---------------------------------------------------------------- */
  img, svg {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;

    &.feather {
      fill: none;
    }
  }

  /* ----------------------------------------------------------------
     Links
  ---------------------------------------------------------------- */
  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: ${transition};

    &:hover,
    &:focus {
      color: ${colors.accent};
    }

    &.inline-link {
      display: inline-block;
      position: relative;
      color: ${colors.accent};
      transition: ${transition};

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background: linear-gradient(90deg, ${colors.accent}, ${colors.secondary});
        opacity: 0.6;

        @media (prefers-reduced-motion: no-preference) {
          transition: ${transition};
        }
      }

      &:hover:after,
      &:focus-visible:after {
        width: 100%;
      }
    }
  }

  /* ----------------------------------------------------------------
     Buttons & forms
  ---------------------------------------------------------------- */
  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: ${sizes.borderRadiusSm};
    outline: 0;
    background: ${colors.bgSurface};
    border: 1px solid ${colors.border};
    color: ${colors.textPrimary};
    font-family: ${fonts.sans};
  }

  /* ----------------------------------------------------------------
     Paragraphs
  ---------------------------------------------------------------- */
  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      display: inline-block;
      position: relative;
      color: ${colors.accent};
      transition: ${transition};

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background: linear-gradient(90deg, ${colors.accent}, ${colors.secondary});
        opacity: 0.6;

        @media (prefers-reduced-motion: no-preference) {
          transition: ${transition};
        }
      }

      &:hover:after,
      &:focus-visible:after {
        width: 100%;
      }
    }

    & > code {
      background-color: ${colors.bgElevated};
      color: ${colors.secondary};
      font-size: ${fontSizes.sm};
      border-radius: ${sizes.borderRadiusSm};
      padding: 0.2em 0.5em;
      font-family: ${fonts.mono};
    }
  }

  /* ----------------------------------------------------------------
     Misc
  ---------------------------------------------------------------- */
  blockquote {
    border-left: 2px solid ${colors.accent};
    margin-left: 0;
    margin-right: 0;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 22px;
      color: ${colors.textSecondary};
    }
  }

  hr {
    background-color: ${colors.border};
    height: 1px;
    border: 0;
    margin: 1.5rem 0;
  }

  code {
    font-family: ${fonts.mono};
    font-size: ${fontSizes.sm};
  }

  /* ----------------------------------------------------------------
     Utility classes
  ---------------------------------------------------------------- */
  .overline {
    color: ${colors.accent};
    font-family: ${fonts.mono};
    font-size: ${fontSizes.xs};
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .skip-to-content {
    color: ${colors.accent};
    background-color: ${colors.bgBase};
    border: 1px solid ${colors.accent};
    border-radius: ${sizes.borderRadius};
    font-size: ${fontSizes.xs};
    font-family: ${fonts.mono};
    line-height: 1;
    text-decoration: none;
    padding: 1.25rem 1.75rem;
    transition: ${transition};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:hover,
    &:focus {
      background-color: ${colors.accent};
      color: ${colors.bgBase};
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 999;
    }

    &:after {
      display: none !important;
    }
  }
`;

export default GlobalStyles;

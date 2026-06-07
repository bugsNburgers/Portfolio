import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const { colors, fonts, fontSizes, sizes, media, transition } = theme;

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${colors.lightestNavy} ${colors.navy};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.navy};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.lightestNavy};
    border: 3px solid ${colors.navy};
    border-radius: 10px;
  }

  /* Selection */
  ::selection {
    background-color: ${colors.lightestNavy};
    color: ${colors.lightestSlate};
  }

  /* Focus */
  :focus {
    outline: 2px dashed ${colors.green};
    outline-offset: 3px;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0;
  }
  :focus-visible {
    outline: 2px dashed ${colors.green};
    outline-offset: 3px;
  }

  /* Body */
  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${colors.navy};
    color: ${colors.slate};
    font-family: ${fonts.sans};
    font-size: ${fontSizes.xl};
    line-height: 1.3;

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
    padding: 100px 0;
    max-width: ${sizes.sectionMaxWidth};

    @media ${media.md} {
      padding: 80px 0;
    }
    @media ${media.sm} {
      padding: 60px 0;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: ${colors.lightestSlate};
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

  /* Section heading — clean line after, no numbered prefix */
  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, 32px);
    white-space: nowrap;
    color: ${colors.lightestSlate};

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: ${colors.lightestNavy};

      @media ${media.md} {
        width: 100%;
      }
    }
  }

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

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: ${transition};

    &:hover,
    &:focus {
      color: ${colors.green};
    }

    &.inline-link {
      ${'' /* inlineLink mixin */}
      display: inline-block;
      position: relative;
      color: ${colors.green};
      transition: ${transition};

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background-color: ${colors.green};
        opacity: 0.5;

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

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: ${sizes.borderRadius};
    outline: 0;

    &:focus {
      outline: 0;
    }

    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      display: inline-block;
      position: relative;
      color: ${colors.green};
      transition: ${transition};

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background-color: ${colors.green};
        opacity: 0.5;

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
      background-color: ${colors.lightNavy};
      color: ${colors.white};
      font-size: ${fontSizes.sm};
      border-radius: ${sizes.borderRadius};
      padding: 0.3em 0.5em;
    }
  }

  blockquote {
    border-left: 2px solid ${colors.green};
    margin-left: 0;
    margin-right: 0;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 24px;
    }
  }

  hr {
    background-color: ${colors.lightestNavy};
    height: 1px;
    border: 0;
    margin: 1rem;
  }

  code {
    font-family: ${fonts.mono};
    font-size: ${fontSizes.md};
  }

  .overline {
    color: ${colors.green};
    font-family: ${fonts.mono};
    font-size: ${fontSizes.xs};
    font-weight: 400;
  }

  .skip-to-content {
    color: ${colors.green};
    background-color: ${colors.navy};
    border: 1px solid ${colors.green};
    border-radius: ${sizes.borderRadius};
    padding: 1.25rem 1.75rem;
    font-size: ${fontSizes.xs};
    font-family: ${fonts.mono};
    line-height: 1;
    text-decoration: none;
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
      background-color: ${colors.greenTint};
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

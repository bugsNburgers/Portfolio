import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.darkSlate} ${({ theme }) => theme.colors.navy};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.lightestNavy};
    color: ${({ theme }) => theme.colors.lightestSlate};
  }

  :focus {
    outline: 2px dashed ${({ theme }) => theme.colors.green};
    outline-offset: 3px;
  }

  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  :focus-visible {
    outline: 2px dashed ${({ theme }) => theme.colors.green};
    outline-offset: 3px;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.navy};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.darkSlate};
    border: 3px solid ${({ theme }) => theme.colors.navy};
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.colors.navy};
    color: ${({ theme }) => theme.colors.slate};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    line-height: 1.3;

    @media ${({ theme }) => theme.media.sm} {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: ${({ theme }) => theme.transition};
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
    max-width: ${({ theme }) => theme.sizes.maxWidth};
    min-height: 100vh;
    padding: 200px 150px;

    @media ${({ theme }) => theme.media.lg} {
      padding: 200px 100px;
    }
    @media ${({ theme }) => theme.media.md} {
      padding: 150px 50px;
    }
    @media ${({ theme }) => theme.media.sm} {
      padding: 125px 25px;
    }

    &.fillHeight {
      padding: 0 150px;

      @media ${({ theme }) => theme.media.lg} {
        padding: 0 100px;
      }
      @media ${({ theme }) => theme.media.md} {
        padding: 0 50px;
      }
      @media ${({ theme }) => theme.media.sm} {
        padding: 0 25px;
      }
    }

    counter-reset: section;
  }

  section {
    margin: 0 auto;
    padding: 100px 0;
    max-width: ${({ theme }) => theme.sizes.sectionMaxWidth};

    @media ${({ theme }) => theme.media.md} {
      padding: 80px 0;
    }
    @media ${({ theme }) => theme.media.sm} {
      padding: 60px 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.lightestSlate};
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

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, ${({ theme }) => theme.fontSizes.heading});
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: ${({ theme }) => theme.colors.green};
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: clamp(${({ theme }) => theme.fontSizes.md}, 3vw, ${({ theme }) =>
  theme.fontSizes.xl});
      font-weight: 400;

      @media ${({ theme }) => theme.media.sm} {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: ${({ theme }) => theme.colors.lightestNavy};

      @media ${({ theme }) => theme.media.lg} {
        width: 200px;
      }
      @media ${({ theme }) => theme.media.md} {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  img,
  svg {
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
    transition: ${({ theme }) => theme.transition};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.green};
    }

    &.inline-link {
      display: inline-block;
      position: relative;
      color: ${({ theme }) => theme.colors.green};
      transition: ${({ theme }) => theme.transition};

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background-color: ${({ theme }) => theme.colors.green};
        opacity: 0.5;

        @media (prefers-reduced-motion: no-preference) {
          transition: ${({ theme }) => theme.transition};
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

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      display: inline-block;
      position: relative;
      color: ${({ theme }) => theme.colors.green};
      transition: ${({ theme }) => theme.transition};

      &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background-color: ${({ theme }) => theme.colors.green};
        opacity: 0.5;

        @media (prefers-reduced-motion: no-preference) {
          transition: ${({ theme }) => theme.transition};
        }
      }

      &:hover:after,
      &:focus-visible:after {
        width: 100%;
      }
    }

    & > code {
      background-color: ${({ theme }) => theme.colors.lightNavy};
      color: ${({ theme }) => theme.colors.white};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      border-radius: ${({ theme }) => theme.sizes.borderRadius};
      padding: 0.3em 0.5em;
    }
  }

  ul.fancy-list {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: ${({ theme }) => theme.fontSizes.lg};

    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  blockquote {
    border-left: 1px solid ${({ theme }) => theme.colors.green};
    margin-left: 0;
    margin-right: 0;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 24px;
    }
  }

  hr {
    background-color: ${({ theme }) => theme.colors.lightestNavy};
    height: 1px;
    border: 0;
    margin: 1rem;
  }

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  .overline {
    color: ${({ theme }) => theme.colors.green};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: 400;
  }

  .subtitle {
    color: ${({ theme }) => theme.colors.green};
    margin: 0 0 20px 0;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: 400;
    line-height: 1.5;

    @media ${({ theme }) => theme.media.lg} {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
    @media ${({ theme }) => theme.media.md} {
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
  }

  .skip-to-content {
    color: ${({ theme }) => theme.colors.green};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.green};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-family: ${({ theme }) => theme.fonts.mono};
    line-height: 1;
    text-decoration: none;
    padding: 1.25rem 1.75rem;
    transition: ${({ theme }) => theme.transition};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.green};
      color: ${({ theme }) => theme.colors.navy};
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
    }

    &:after {
      display: none !important;
    }
  }
`;

export default GlobalStyles;

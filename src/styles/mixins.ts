import { css } from 'styled-components';

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: ${({ theme }) => theme.transition};

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => theme.colors.accent};
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: ${({ theme }) => theme.colors.accent};
    transition: ${({ theme }) => theme.transition};

    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.secondary});
      opacity: 0.6;

      @media (prefers-reduced-motion: no-preference) {
        transition: ${({ theme }) => theme.transition};
      }
    }

    &:hover:after,
    &:focus-visible:after {
      width: 100%;
    }
  `,

  // Gradient-fill primary button
  bigButton: css`
    color: ${({ theme }) => theme.colors.white};
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.accentLight});
    border: none;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    padding: 0.9rem 1.8rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: ${({ theme }) => theme.transition};
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, ${({ theme }) => theme.colors.accentLight}, ${({ theme }) => theme.colors.accent});
      opacity: 0;
      transition: ${({ theme }) => theme.transition};
    }

    &:hover,
    &:focus-visible {
      outline: none;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px ${({ theme }) => theme.colors.accentGlowStrong};

      &:before {
        opacity: 1;
      }
    }

    &:after {
      display: none !important;
    }
  `,

  // Ghost/outline secondary button
  smallButton: css`
    color: ${({ theme }) => theme.colors.accent};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-family: ${({ theme }) => theme.fonts.mono};
    line-height: 1;
    text-decoration: none;
    padding: 0.65rem 1rem;
    transition: ${({ theme }) => theme.transition};
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.colors.accentGlow};
      outline: none;
      box-shadow: 0 0 12px ${({ theme }) => theme.colors.accentGlow};
    }

    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 8px 30px -12px ${({ theme }) => theme.colors.shadow};
    transition: ${({ theme }) => theme.transition};

    &:hover,
    &:focus-visible {
      box-shadow: 0 16px 40px -12px ${({ theme }) => theme.colors.shadow};
    }
  `,

  // Pill tags (replaces Brittany's ▹ arrow list)
  pillTag: css`
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    background: ${({ theme }) => theme.colors.accentGlow};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 100px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.accent};
    letter-spacing: 0.04em;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      background: ${({ theme }) => theme.colors.accentGlowStrong};
      border-color: ${({ theme }) => theme.colors.accent};
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,

  // Glass card effect
  glassCard: css`
    background: rgba(22, 22, 26, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
  `,
} as const;

export default mixins;

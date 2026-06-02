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
      color: ${({ theme }) => theme.colors.green};
    }
  `,

  inlineLink: css`
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
  `,

  smallButton: css`
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
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.colors.greenTint};
      outline: none;
    }

    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
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

    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px ${({ theme }) => theme.colors.navyShadow};
    transition: ${({ theme }) => theme.transition};

    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 30px -15px ${({ theme }) => theme.colors.navyShadow};
    }
  `,

  fancyList: css`
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
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
} as const;

export default mixins;

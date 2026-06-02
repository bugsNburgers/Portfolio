// Augments the styled-components DefaultTheme with our custom theme type
// This gives full type safety on theme.colors.xxx, theme.fonts.xxx etc.
import 'styled-components';
import { theme } from './theme';

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';

interface ProvidersProps {
  children: React.ReactNode;
}

// This must be a client component because ThemeProvider uses React context
// which is client-side only in Next.js App Router
export default function Providers({ children }: ProvidersProps): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

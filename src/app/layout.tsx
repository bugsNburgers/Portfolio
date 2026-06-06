import React from 'react';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import Providers from '@/components/Providers';
import '@/app/globals.css';

// ------------------------------------------------------------------
// SEO Metadata
// ------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Suprateek Yawagal',
  description:
    'Suprateek Yawagal is a software engineer who builds things for the web with a focus on crafting accessible, human-centered digital experiences.',
  keywords: ['Suprateek Yawagal', 'software engineer', 'web developer', 'portfolio'],
  authors: [{ name: 'Suprateek Yawagal' }],
  openGraph: {
    title: 'Suprateek Yawagal',
    description: 'Suprateek Yawagal is a software engineer who builds things for the web.',
    url: 'https://suprateekyawagal.in',
    siteName: 'Suprateek Yawagal',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Suprateek Yawagal - Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suprateek Yawagal',
    description: 'Suprateek Yawagal is a software engineer who builds things for the web.',
    images: ['/og.png'],
    creator: '[REPLACE: @suprateek]',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

// ------------------------------------------------------------------
// Root layout
// ------------------------------------------------------------------

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

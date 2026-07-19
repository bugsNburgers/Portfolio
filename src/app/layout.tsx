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
    icon: '/favicon.jpg?v=1',
  },
};

// ------------------------------------------------------------------
// Root layout
// ------------------------------------------------------------------

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Suprateek Yawagal | Portfolio',
    alternateName: ['Suprateek Yawagal Portfolio'],
    url: 'https://suprateekyawagal.in',
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/google-sans" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            {children}
          </Providers>
        </StyledComponentsRegistry>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

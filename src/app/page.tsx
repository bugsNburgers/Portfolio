import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import OtherProjects from '@/components/sections/OtherProjects';
import Now from '@/components/sections/Now';
import Writing from '@/components/sections/Writing';
import Contact from '@/components/sections/Contact';

// Disable static generation — page uses client-side styled-components
// that require ThemeProvider context which is set up at runtime
export const dynamic = 'force-dynamic';

export default function Home(): React.ReactElement {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <OtherProjects />
      <Now />
      <Writing />
      <Contact />
    </Layout>
  );
}

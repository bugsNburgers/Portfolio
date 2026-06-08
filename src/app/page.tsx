import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import OtherProjects from '@/components/sections/OtherProjects';
import TechRadar from '@/components/sections/TechRadar';
import Now from '@/components/sections/Now';
import Writing from '@/components/sections/OSS';
import Contact from '@/components/sections/Contact';

// Disable static generation — page uses client-side styled-components
export const dynamic = 'force-dynamic';

export default function Home(): React.ReactElement {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <OtherProjects />
      <TechRadar />
      <Now />
      <Writing />
      <Contact />
    </Layout>
  );
}

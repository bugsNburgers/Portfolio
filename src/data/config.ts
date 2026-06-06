import { SiteConfig } from '@/types';

const config: SiteConfig = {
  name: 'Suprateek Yawagal',
  title: 'Suprateek Yawagal',
  description:
    'Suprateek Yawagal is a software engineering student at PES University who builds developer tools, web apps, and the occasional IoT project.',
  siteUrl: 'https://suprateek.dev',
  email: 'suprateek.yawagal@gmail.com',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/bugsNburgers' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/suprateek-yawagal' },
  ],
  navLinks: [
    { name: 'About', url: '/#about' },
    { name: 'Experience', url: '/#experience' },
    { name: 'Projects', url: '/#projects' },
    { name: 'Now', url: '/#now' },
    { name: 'OSS', url: '/#writing' },
  ],
};

export default config;

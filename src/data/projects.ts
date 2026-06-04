import { FeaturedProject } from '@/types';

export const featuredProjects: FeaturedProject[] = [
  {
    title: '[REPLACE: Project Name One]',
    description:
      '[REPLACE: A web app for visualizing personalized data. Built with React and D3.js, this project pulls data from multiple APIs and presents it in an interactive dashboard with real-time filtering and export capabilities.]',
    techStack: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL'],
    githubUrl: '[REPLACE: https://github.com/suprateek/project-1]',
    externalUrl: '[REPLACE: https://project-1.demo.com]',
    image: '/images/projects/project-1.png',
    imageAlt: '[REPLACE: Screenshot of Project One dashboard]',
  },
  {
    title: '[REPLACE: Project Name Two]',
    description:
      '[REPLACE: A full-stack e-commerce platform with authentication, payment processing, and an admin dashboard. Features include real-time inventory management, order tracking, and responsive design across all devices.]',
    techStack: ['Next.js', 'Stripe', 'Prisma', 'Tailwind CSS', 'Supabase'],
    githubUrl: '[REPLACE: https://github.com/suprateek/project-2]',
    externalUrl: '[REPLACE: https://project-2.demo.com]',
    image: '/images/projects/project-2.png',
    imageAlt: '[REPLACE: Screenshot of Project Two storefront]',
  },
  {
    title: '[REPLACE: Project Name Three]',
    description:
      '[REPLACE: A developer tool that simplifies the process of generating boilerplate code. Supports multiple frameworks and languages with customizable templates and a CLI interface.]',
    techStack: ['Python', 'Click', 'Jinja2', 'GitHub Actions'],
    githubUrl: '[REPLACE: https://github.com/suprateek/project-3]',
    image: '/images/projects/project-3.png',
    imageAlt: '[REPLACE: Screenshot of Project Three CLI output]',
  },
];

# My Personal Portfolio

Welcome to the repository for my personal portfolio website. This is a highly interactive, responsive, and modern web application showcasing my projects, technical skills, academic background, and professional experiences.

🔗 **Live Website**: [suprateekyawagal.in](https://suprateekyawagal.in)

---

## 🛠️ Tech Stack & Libraries

This project is built using a modern frontend stack:

- **Framework**: [Next.js](https://nextjs.org/) (v14 with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [styled-components](https://styled-components.com/) for styled CSS-in-JS components
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth micro-interactions, page transitions, and animations
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives for accessible interactive elements (Dialog, Tabs)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Code Style & Formatting**: [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/)

---

## ✨ Features

- **Dynamic Navigation & Layout**: Custom interactive navigation bar, sliding sidebars (Socials & Email), and mobile drawer menu.
- **Custom Cursor Spotlight**: Interactive gradient tracking cursor to enhance user engagement.
- **Stunning Page Sections**:
  - **Hero**: Catchy introduction with typing animations and call-to-actions.
  - **About**: Personal profile and detailed background.
  - **Experience**: Timeline detailing previous work and internships.
  - **Education**: Detailed academic background.
  - **Projects & OSS**: Highlights of key projects, including open-source contributions.
  - **Tech Radar**: Interactive layout showcasing developer skills, tool sets, and domains of expertise.
  - **Now**: A dedicated "now" page section highlighting current focus areas.
  - **Contact**: Quick-access form and mail triggers.

---

## 📁 Project Structure

```text
portfolio/
├── public/             # Static assets (images, icons, configuration files)
├── src/
│   ├── app/            # Next.js App Router (Layouts & main pages)
│   ├── components/     # Reusable React UI components
│   │   ├── sections/   # Component sections (Hero, About, Projects, TechRadar, etc.)
│   │   └── ...
│   ├── data/           # Content configurations (all details, copy, and link data)
│   ├── hooks/          # Custom React hooks (scroll detection, media queries, etc.)
│   ├── styles/         # Global styles, variables, theme config, and styled utilities
│   ├── types/          # Custom TypeScript interface declarations
│   └── lib/            # Shared libraries or client helpers
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and build scripts
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have Node.js installed (v18+ recommended) along with `npm` or `yarn`.

### ⚙️ Installation

First, clone the repository and navigate into the `portfolio` directory:

```bash
git clone https://github.com/bugsNburgers/Portfolio.git
cd Portfolio/portfolio
```

Install the dependencies:

```bash
npm install
```

### 💻 Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the local deployment.

### 🏗️ Production Build

Build the project for production:

```bash
npm run build
```

Run the built application:

```bash
npm start
```

### 🧹 Code Quality

Format the source files using Prettier:

```bash
npm run format
```

---

## ⚙️ Customization & Content Updates

To update the information presented on the portfolio, edit the corresponding configuration files in the `src/data/` folder:

- **Site Configuration**: Edit `src/data/config.ts` to change names, title, description, and social media URLs.
- **Hero & About Section**: Edit `src/data/hero.ts` and `src/data/about.ts`.
- **Experience & Education**: Modify `src/data/experience.ts` and `src/components/sections/Education.tsx`.
- **Projects**: Manage projects in `src/data/projects.ts` and `src/data/otherProjects.ts`.
- **Skills Radar**: Adjust skills in `src/data/techRadar.ts`.

---

## Deployment

This site is automatically built and deployed via **Vercel** on every push to the `main` branch.

---

© Suprateek Yawagal

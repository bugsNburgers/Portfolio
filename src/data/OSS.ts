import { WritingEntry } from '@/types';

// Repurposed as OSS Contributions section
const writingData: WritingEntry[] = [
  {
    title: 'style(dashboard): update GPA and Credit Totals card designs',
    url: 'https://github.com/Longhorn-Developers/Degree-Audit-Plus/pull/194',
    date: 'July 21, 2026',
    readTime: 'Merged',
    excerpt:
      'Fixed UI styling for the GPA and Credit Hour cards on the Degree-Audit-Plus dashboard to accurately reflect the Figma designs. Adjusted border radiuses and layout spacing to ensure visual consistency.',
    tags: ['React', 'CSS', 'UI/UX', 'Frontend'],
  },
  {
    title: 'feat(media): support numeric sizes shorthand',
    url: 'https://github.com/once-ui-system/core/pull/72',
    date: 'April 23, 2026',
    readTime: 'Merged',
    excerpt:
      'Added numeric shorthand support for the Media component\'s sizes prop in Once UI. Passing a number (e.g. sizes={768}) now auto-generates the correct responsive sizes string, eliminating repetitive boilerplate for common use-cases.',
    tags: ['Once UI', 'TypeScript', 'Component API', 'DX'],
  },
  {
    title: 'Fix touch hover behavior for Button and ToggleButton',
    url: 'https://github.com/once-ui-system/core/pull/71',
    date: 'May 4, 2026',
    readTime: 'Merged',
    excerpt:
      'Fixed a bug in Once UI where tap interactions on touch devices triggered unintended hover styling on Button and ToggleButton components. Scoped hover styles behind pointer media queries while preserving keyboard focus-visible accessibility behavior.',
    tags: ['Once UI', 'CSS', 'Accessibility', 'UX'],
  },
];

export default writingData;

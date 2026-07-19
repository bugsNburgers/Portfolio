/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three', 'postprocessing'],
};

module.exports = nextConfig;

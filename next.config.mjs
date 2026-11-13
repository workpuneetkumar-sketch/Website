/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/careers.html',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact-v1',
        permanent: true,
      },
      {
        source: '/features.html',
        destination: '/features',
        permanent: true,
      },
      {
        source: '/pricing.html',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/faq.html',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-v1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

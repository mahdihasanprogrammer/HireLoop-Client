/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverComponentsExternalPackages: ['@better-auth/kysely-adapter'],
  },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**', port: '', pathname: '**', search: '', }, { protocol: 'https', hostname: 'images.pexels.com', }], },
};

export default nextConfig;

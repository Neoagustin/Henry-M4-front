/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  onDemandEntries: {
    // Devuelve el código de las páginas en cada solicitud
    maxInactiveAge: 25 * 1000, // Tiempo máximo para mantener las páginas en caché
    pagesBufferLength: 2, // Cuántas páginas mantener en el búfer
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'acdn.mitiendanube.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  images: {
    domains: [
      'techba.ar',
      'acdn.mitiendanube.com',
      'cdsassets.apple.com',
      'outtec.com.ar',
      'www.apple.com',
      'http2.mlstatic.com',
      'segurocelular.com.ar',
    ],
  },
};

export default nextConfig;

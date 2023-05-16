/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DOWNLOAD_APK_NAME: process.env.DOWNLOAD_APK_NAME,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is stable in Next.js 14
  output: 'export',
  trailingSlash: true,
  basePath: '/FinSENTLLM-Paper',
  assetPrefix: '/FinSENTLLM-Paper',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
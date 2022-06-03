/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*'
      },
      {
        source: '/:path*',
        destination: 'http://localhost:3001/:path*'
      }
    ]
    
  }

}

module.exports = nextConfig

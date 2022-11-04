/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/generate',
        permanent: true,
      },
    ]
  },
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Fixes this sequelize error:
   * 
   * Critical dependency: the request of a dependency is an expression.
   */
  experimental: {
    serverComponentsExternalPackages: ['sequelize'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
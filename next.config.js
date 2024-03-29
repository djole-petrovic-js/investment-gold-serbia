const withNextIntl = require("next-intl/plugin")(
  "./lib/internationalization/i18n.ts"
)

/** @type {import('next').NextConfig} */
let nextConfig = {
  images: {
    domains: [process.env.CDN_URL]
  }
}

nextConfig = withNextIntl(nextConfig)

module.exports = nextConfig

const withNextIntl = require("next-intl/plugin")(
  "./lib/internationalization/i18n.ts"
)

/** @type {import('next').NextConfig} */
let nextConfig = {
  images: {
    domains: ["investment-gold-serbia-storage.fra1.cdn.digitaloceanspaces.com"]
  }
}

nextConfig = withNextIntl(nextConfig)

module.exports = nextConfig

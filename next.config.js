const withNextIntl = require("next-intl/plugin")(
  "./lib/internationalization/i18n.ts"
)

/** @type {import('next').NextConfig} */
let nextConfig = {}

nextConfig = withNextIntl(nextConfig)

module.exports = nextConfig

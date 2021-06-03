const withPlugins = require('next-compose-plugins')

const plugins = []

const nextConfig = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
}

module.exports = withPlugins(plugins, nextConfig)

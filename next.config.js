const { redirect } = require('next/dist/next-server/server/api-utils')

module.exports = {
  webpack(config, options) {
    return config
  },
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false
  }
}

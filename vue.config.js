const path = require('path')

const resolveRoot = path.resolve.bind(path, __dirname)

module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set('@views', resolveRoot('src/views'))
      .set('@components', resolveRoot('src/components'))
  }
}

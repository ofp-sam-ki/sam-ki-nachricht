const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '',
  pluginOptions: {
  },
  outputDir: 'dist',
  devServer: {
    host: '127.0.0.1',
    port: 8081
  }
})

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // sass-loader v8 之前使用 additionalData
        prependData: "@import '~@/assets/scss/variables.scss';"
      }
    }
  }
}

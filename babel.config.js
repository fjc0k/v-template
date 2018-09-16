module.exports = {
  presets: [
    ['@vue/app', {
      loose: true
    }]
  ],
  plugins: [
    ['import', {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false
    }, 'lodash']
  ]
}

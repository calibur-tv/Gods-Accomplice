const autoprefixer = require('autoprefixer')
// to fix this bug：https://github.com/postcss/postcss-loader/issues/204
module.exports = () => ({
  plugins: [
    autoprefixer({
      browsers: ['> 1%', 'last 3 versions', 'ie > 8'],
      remove: false
    })
  ]
})

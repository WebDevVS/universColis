const { minify } = require('html-minifier-terser')

module.exports = function minifyMiddleware(req, res, next) {
  const originalRender = res.render

  res.render = function (view, options = {}, callback) {
    const wrappedCallback = async (err, html) => {
      if (err) return callback?.(err)

      try {
        const minified = await minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        })

        return callback?.(null, minified) || res.send(minified)
      } catch (error) {
        console.error('Erreur de minification HTML :', error)
        return callback?.(null, html) || res.send(html)
      }
    }

    return originalRender.call(this, view, options, wrappedCallback)
  }

  next()
}


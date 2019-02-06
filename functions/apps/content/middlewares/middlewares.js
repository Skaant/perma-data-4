const lang = require('./lang/lang')

module.exports = app => {
  app.use(lang)
  return app
}
const pug = require('pug')

module.exports = (err, props, res) => {
  console.log(err)
  const { lang, translation } = props
  res
    .status(err.status || 500)
    .send(pug.renderFile('./pug/html/html.pug', {
      id: 'error',
      lang,
      error: err,
      translation
    }))
  }
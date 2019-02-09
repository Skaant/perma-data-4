const pug = require('pug')

module.exports = (err, lang, res) => 
  res
    .status(err.status || 500)
    .send(pug.renderFile('./pug/html/html.pug', {
      id: 'error',
      lang,
      error: err,
      translation: {}
    }))
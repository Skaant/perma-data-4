const translation = require('./translation/translation')

module.exports = (id, req) =>
  new Promise((resolve, reject) => {
    const lang = req.lang || 'fr'
    translation({
      id,
      lang
    })
      .then(translation =>
        resolve(Object.assign({
          id,
          lang,
          url: req.url
        }, {
          translation
        })))
      .catch(err => reject(err))
  })
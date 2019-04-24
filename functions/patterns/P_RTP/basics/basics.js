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
          url: [''].concat(req.originalUrl.split('/').slice(2)).join('/')
        }, {
          translation
        }, req.params ? {
          params: req.params
        } : {})))
      .catch(err => reject(Object.assign({}, err, { lang })))
  })
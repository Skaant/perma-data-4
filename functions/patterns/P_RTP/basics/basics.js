const translation = require('./translation/translation')
const langsRefs = require('../../../apps/content/langRouter/langRefs/langRefs')

module.exports = (id, req) =>
  new Promise((resolve, reject) => {
    const lang = (req.lang && langsRefs.includes(req.lang)) ? req.lang : 'fr'
    translation({
      id,
      lang
    })
      .then(translation => {
        if (!langsRefs.includes(req.lang)) {
          reject({
            title: 'no url lang',
            message: `you must start url with a language within : "${
              langsRefs.join('", "')
            }"`,
            status: 404,
            lang,
            translation
          })
        } else if (!id) {
          reject({
            title: 'no page found',
            message: 'nope, there is nothing here',
            status: 404,
            lang,
            translation
          })
        }
        resolve(Object.assign({
          id,
          lang,
          url: [''].concat(req.originalUrl.split('/').slice(2)).join('/')
        }, {
          translation
        }, req.params ? {
          params: req.params
        } : {}))
      })
      .catch(err => reject(Object.assign({}, err, { lang })))
  })
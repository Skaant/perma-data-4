const pageModules = require('./pageModules/pageModules')

module.exports = (id, lang) => 
  new Promise((resolve, reject) => {
    global.firestore.collection('translations')
      .doc(`modules-${ lang }`).get()
      .then(doc => {
        if (!doc.exists) {
          reject(new Error(`no modules translation found for ${ lang }`))
        }
        const translations = doc.data()
        resolve({
          translations: pageModules(id).reduce((acc, moduleKey) => {
            acc[moduleKey] = translations[moduleKey]
            return acc
          }, {})
        })
      })
      .catch(err => reject(err))
  })
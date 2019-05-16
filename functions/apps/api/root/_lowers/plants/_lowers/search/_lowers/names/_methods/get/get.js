const getByName = require('../../../../../../../../../../provisioners/plants/getByName/getByName')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { key, lang } = req.query
    if (!lang) {
      reject({
        message: 'no lang specified'
      })
    } else {
      getByName(key, lang)
        .then(results => {
          if (!results.plants) {
            reject({
              message: 'wrong names results format',  
              results
            })
          } else {
            resolve(results)
          }
        })
      }
  })
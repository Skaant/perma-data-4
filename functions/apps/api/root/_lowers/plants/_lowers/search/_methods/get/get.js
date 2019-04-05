const getByIdWithNames = require('../../../../../../../../provisioners/plants/getByIdWithNames/getByIdWithNames')
const getByName = require('../../../../../../../../provisioners/plants/getByName/getByName')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { key, lang } = req.query
    if (!lang) {
      reject({
        message: 'no lang specified'
      })
    } else {
      getByIdWithNames(key, lang)
        .then(results => {
          if (!results.plants) {
            reject({
              message: 'wrong ids results format',  
              results
            })
          } else if (results.plants.length > 0) {
            resolve(results)
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
              .catch(err => reject(err))
          }
        })
      .catch(err => reject(err))
    }
  })
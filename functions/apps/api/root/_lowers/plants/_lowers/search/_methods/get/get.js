const getById = require('../../../../../../../../provisioners/plants/getById/getById')
const getByName = require('../../../../../../../../provisioners/plants/getByName/getByName')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { key, lang } = req.query
      getById(key)
        .then(results => {
          if (!results.plants) {
            reject({
              message: 'wrong ids results format',  
              results
            })
          } else if (results.plants.length > 0) {
            resolve(Object.assign({}, results, {
              step: 1
            }))
          } else {
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
                    resolve(Object.assign({}, results, {
                      step: 2
                    }))
                  }
                })
              .catch(err => reject(err))
            }
          }
        })
      .catch(err => reject(err))
  })
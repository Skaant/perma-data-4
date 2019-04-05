const getById = require('../../../../../../../../../../provisioners/plants/getById/getById')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { key } = req.query
    getById(key)
      .then(results => {
        if (!results.plants) {
          reject({
            message: 'wrong ids results format',  
            results
          })
        } else {
          resolve(results)
        }
      })
      .catch(err => reject(err))
  })
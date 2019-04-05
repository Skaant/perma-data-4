const getById = require('../../../../../../../../provisioners/plants/getById/getById')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { key } = req.query
    getById(key)
      .then(plants => {
        if (plants.length > 0) {
          resolve(plants)
        } else {
          resolve('next step')
          // getByName
        }
      })
  })
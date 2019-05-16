
const getDatasWithSources = require('./getDatasWithSources/getDatasWithSources')

module.exports = id =>
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('plants')
        .findOne({
          _id: id
        })
        .then(plant => {
          if (!plant) {
            reject('no plant found')
          }
          getDatasWithSources(client, plant)
            .then(result => resolve(Object.assign({}, { plant }, result)))
        })
      .catch(err => reject(err))
    })
  })
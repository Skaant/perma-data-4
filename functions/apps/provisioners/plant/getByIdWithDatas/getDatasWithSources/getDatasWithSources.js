const getSources = require('./getSources/getSources')

module.exports = (client, plant) =>
  new Promise((resolve, reject) => {
    client.db('prod')
    .collection('datas')
    .aggregate([{
      $match: {
        type: {
          $exists: true
        },
        plants: {
          $in: [plant._id].concat(plant.parents)
        }
      }
    }, {
      $unwind: {
        path: '$plants'
      }
    }, {
      $match: {
        plants: {
          $in: [plant._id].concat(plant.parents)
        }
      }
    }])
    .toArray((err, datas) => {
      if (err) {
        reject(err)
      }
      getSources(client, datas)
        .then(sources => {
          resolve(datas.reduce((result, data) => {
            const { _id } = data

            result.datas[_id] = data

            if (!result.types[data.type]) {
              result.types[data.type] = []
            }
            result.types[data.type].push(_id)
            
            if (!result.plants[data.plants]) {
              result.plants[data.plants] = []
            }
            result.plants[data.plants].push(_id)

            return result
          }, {
            datas: {},
            types: {},
            plants: {},
            sources
          }))
        })
        .catch(err => reject(err))
    })
  })
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
          client.db('prod')
            .collection('datas')
            .aggregate([{
              $match: {
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
            }, {
              $group: {
                _id: '$plants',
                datas: {
                  $push: {
                    type: '$type',
                    value: '$value',
                    weight: '$weight'
                  }
                }
              }
            }])
            .toArray((err, datas) => {
              if (err) {
                reject(err)
              }
              resolve({
                plant,
                datas: datas.reduce((plantsObject, plant) => {
                  plantsObject[plant._id] = plant.datas
                  return plantsObject
                }, {})
              })
            })
        })
      .catch(err => reject(err))
    })
  })
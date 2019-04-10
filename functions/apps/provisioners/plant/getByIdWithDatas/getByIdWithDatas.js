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
              resolve(Object.assign({}, { plant },
                datas.reduce((result, data) => {
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
                  plants: {}
                })
              ))
            })
        })
      .catch(err => reject(err))
    })
  })
module.exports = props =>
  new Promise((resolve, reject) => {
    const { id } = props.params
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
            }])
            .toArray((err, datas) => {
              if (err) {
                reject(err)
              }
              const datasByPlant = datas.reduce((datasByPlant, data) => {
                if (!datasByPlant[data.plants]) {
                  datasByPlant[data.plants] = [data]
                } else {
                  datasByPlant[data.plants].push(data)
                }
                return datasByPlant
              }, {})
              const name = datasByPlant[plant._id]
                .filter(data => data.tags.includes('name') && data.tags.includes(props.lang))
                .sort((a, b) => b - a)[0].value
              resolve(Object.assign({}, props, {
                plant: Object.assign({}, plant, { name }),
                datas: datasByPlant
              }))
            })
        })
      .catch(err => reject(err))
    })
  })
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
            .find({
              plants: plant._id,
              tags:'name'
            })
            .sort({
              weight: -1
            })
            .toArray((err, names) => {
              if (err) {
                reject(err)
              }
              resolve(Object.assign({}, props, {
                plant: Object.assign({}, plant, {
                  name: names[0].value
                })
              }))
            })
        })
      .catch(err => reject(err))
    })
  })
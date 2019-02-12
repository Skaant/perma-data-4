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
              plants: {
                $in: [plant._id].concat(plant.parents)
              }
            })
            .toArray((err, datas) => {
              if (err) {
                reject(err)
              }
              console.log(datas)
              resolve(Object.assign({}, props, {
                plant,
                datas
              }))
            })
        })
      .catch(err => reject(err))
    })
  })
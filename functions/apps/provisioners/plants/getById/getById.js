module.exports = key =>
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('plants')
        .aggregate([
          {
            $match: {
              _id: new RegExp(key, 'i')
            }
          }, {
            $group: {
              _id: '$_id'
            }
          }
        ])
        .toArray((err, plants) => {
          if (err) {
            reject(err)
          }
          resolve({ plants })
        })
    })
  })
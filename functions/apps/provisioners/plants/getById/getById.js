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
              $text: {
                $search: key
              }
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
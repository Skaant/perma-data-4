module.exports = key =>
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('plants')
        .find({
          $text: {
            $search: key
          }
        })
        .toArray((err, plants) => {
          if (err) {
            reject(err)
          }
          resolve({ plants })
        })
    })
  })
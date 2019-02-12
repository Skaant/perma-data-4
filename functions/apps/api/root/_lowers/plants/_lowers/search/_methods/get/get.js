module.exports = req =>
  new Promise((resolve, reject) => {
    const { key } = req.query
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
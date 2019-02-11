module.exports = req =>
  new Promise((resolve, reject) => {
    const { keys } = req.query
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('plants')
        .find({})
        .toArray((err, plants) => {
          client.close()
          if (err) {
            reject(err)
          }
          resolve({ plants })
        })
    })
  })
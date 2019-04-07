module.exports = req =>
  new Promise((resolve, reject) => {
    const { email, pseudo } = JSON.parse(req.body)
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('users')
        .insertOne({
          _id: email,
          pseudo
        })
        .then(() =>
          resolve({
            added: true
          }))
        .catch(err => reject(err))
    })
  })
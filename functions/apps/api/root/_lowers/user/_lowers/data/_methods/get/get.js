module.exports = req =>
  new Promise((resolve, reject) => {
    const { uid } = req.query
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('users')
        .findOne({
          _id: uid
        })
        .then(user => {
          if (!user) {
            reject({
              status: 404,
              title: `user ${ uid } not found`
            })
          }
          resolve({ user })
        })
    })
  })
const validateUser = require('./validateUser/validateUser')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { uid, email } = req.query
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const dbUsers = client.db('prod')
        .collection('users')
      dbUsers
        .findOne({
          _id: uid
        })
        .then(user => {
          if (user) {
            resolve({ user })
          }
          if (!email) {
            reject({
              status: 404,
              title: `user ${ uid } not found`
            })
          }
          dbUsers
            .findOne({
              _id: email
            })
            .then(user => {
              if (!user) {
                reject({
                  status: 404,
                  title: `user ${ uid } not found`
                })
              }
              validateUser(dbUsers, user, uid)
                .then(user => resolve({ user }))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  })
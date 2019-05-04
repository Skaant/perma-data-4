const validateUser = require('./validateUser/validateUser')
const userRelated = require('../../../../../../../../provisioners/userRelated/userRelated')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { uid, email, lang } = req.query
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const db = client.db('prod')
      const dbUsers = db.collection('users')
      dbUsers
        .findOne({
          _id: uid
        })
        .then(user => {
          if (user) {
            userRelated(db, user, lang)
              .then(_user =>
                resolve(_user))
              .catch(err => 
                reject(err))
          } else {
            // TODO externalize (generic concat.provisionDialogs) & parseUser pre-resolve
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
                  .then(user => 
                    userRelated(db, user, lang)
                      .then(user => resolve(user))
                      .catch(err => reject(err)))
                  .catch(err => reject(err))
              })
              .catch(err => reject(err))
          }
        })
        .catch(err => 
          reject(err))
    })
  })
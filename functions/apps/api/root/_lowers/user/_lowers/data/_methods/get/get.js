const validateUser = require('./validateUser/validateUser')
const userRelated = require('../../../../../../../../_aggregations/userRelated/userRelated')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { uid, email, lang } = req.query
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const dbUsers = client.db('prod').collection('users')
      dbUsers.findOne({
        _id: uid
      })
      .then(user => {
        if (user) {
          dbUsers
            .aggregate(userRelated(uid, lang))
            .toArray((err, _user) => {
              if (err) {
                reject(err)
              } else if (!_user[0]) {
                reject({
                  status: 404,
                  title: 'user data aggregation error',
                  message: 'no user data at the end of the pipeline'
                })
              }
              resolve(Object.assign({}, user, _user[0]))
            })
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
                  title: 'unknown user',
                  message: `no user found, neither for ${ uid } nor ${ email }`
                })
              }
              validateUser(dbUsers, user, uid)
                .then(user => 
                  dbUsers
                    .aggregate(userRelated(uid, lang))
                    .toArray((err, _user) => {
                      if (err) {
                        reject(err)
                      } else if (!_user[0]) {
                        reject({
                          status: 404,
                          title: 'user data aggregation error',
                          message: 'no user data at the end of the pipeline'
                        })
                      }
                      resolve(Object.assign({}, user, _user[0]))
                    }))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        }
      })
      .catch(err => 
        reject(err))
    })
  })
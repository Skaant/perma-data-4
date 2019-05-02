const validateUser = require('./validateUser/validateUser')
const userAggregation = require('./userAggregation/userAggregation')
const parseDialogs = require('./parseDialogs/parseDialogs')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { uid, email, lang } = req.query
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const dbUsers = client.db('prod')
        .collection('users')
      userAggregation(dbUsers, req.query)
        .toArray((err, result) => {
          if (err) {
            reject(err)
          }
          const user = result[0]
          if (user) {
            resolve({ 
              user: Object.assign({}, user, {
                dialogs: parseDialogs(user.dialogs, lang)
              })
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
                    title: `user ${ uid } not found`
                  })
                }
                validateUser(dbUsers, user, uid)
                  .then(uid => userAggregation(dbUsers, { uid, lang })
                    .toArray((err, result) => {
                      if (err) {
                        reject(err)
                      }
                      const user = result[0]
                      if (user) {
                        resolve({ 
                          user: Object.assign({}, user, {
                            dialogs: parseDialogs(user.dialogs, lang)
                          })
                        })
                      } else {
                        reject(new Error('Error while loading newly created user. Please try updating the page.'))
                      }
                    }))
                  .catch(err => reject(err))
              })
              .catch(err => reject(err))
          }
        })
    })
  })
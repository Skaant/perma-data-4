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
        .aggregate([
          {
            $match: {
              _id: uid
            }
          }, {
            $unwind: {
              path: '$dialogs',
              preserveNullAndEmptyArrays: true
            }
          }, {
            $lookup: {
              from: 'dialogs',
              localField: 'dialogs',
              foreignField: '_id',
              as: 'dialogsProvisioned'
            }
          }, {
            $group: {
              _id: '$_id',
              pseudo: {
                $first: '$pseudo'
              },
              roles: {
                $first: '$roles'
              },
              dialogs: {
                $push: '$dialogsProvisioned'
              }
            }
          }
        ])
        .toArray((err, result) => {
          if (err) {
            reject(err)
          }
          const user = result[0]
          if (user) {
            resolve({ 
              user: Object.assign({}, user, {
                dialogs: user.dialogs.map(dialog => dialog[0])
              })
            })
          }
          if (!email) {
            reject({
              status: 404,
              title: `user ${ uid } not found`
            })
          }
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
                .then(user => resolve({ user }))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
    })
  })
const ObjectId = require('mongodb').ObjectId

const conditionalHome = require('./conditionalHome/conditionalHome')
const userRelated = require('../../../../../../../../_aggregations/userRelated/userRelated')

module.exports = ({ uid, form, lang }) => 
  new Promise((resolve, reject) => {
    if (!form) {
      reject(new Error('missing form'))
    }
    const home = conditionalHome(form)
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const dbUsers = db.db('prod').collection('users')
      dbUsers
        .updateOne({ _id: uid },
          {
            $set: {
              home,
              dialogs: [ObjectId('5ccbd6521c9d440000a85df5')]
            }
          })
          .then(() => 
            dbUsers
              .aggregate(userRelated(uid, lang))            
              .toArray((err, user) => {
                if (err) {
                  reject(err)
                } else if (!user[0]) {
                  reject({
                    status: 404,
                    title: 'user data aggregation error',
                    message: 'no user data at the end of the pipeline'
                  })
                }
                resolve(Object.assign({}, user, user[0]))
              }))
          .catch(err => reject(err))
        })
  })
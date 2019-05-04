const ObjectId = require('mongodb').ObjectId

const conditionalHome = require('./conditionalHome/conditionalHome')
const provisionRelated = require('./provisionRelated/provisionRelated')

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
      const db = client.db('prod')
      db.collection('users')
        .updateOne({ _id: uid },
          {
            $set: {
              home,
              dialogs: [ObjectId('5ccbd6521c9d440000a85df5')]
            }
          })
          .then(() => 
            provisionRelated(db, {
              doms: home.doms,
              dialogs: [ObjectId('5ccbd6521c9d440000a85df5')]
            }, lang)
              .then(result => resolve(Object.assign({}, {
                updated: true
              }, result)))
              .catch(err => 
                reject(err)))
          .catch(err => reject(err))
    })
  })
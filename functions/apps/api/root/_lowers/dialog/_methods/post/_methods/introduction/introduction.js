const userRelated = require('../../../../../../../../_aggregations/userRelated/userRelated')
const doms = require('./doms/doms')
const events = require('./events/events')

module.exports = ({ uid, lang }) => 
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const dbUsers = client.db('prod').collection('users')
      dbUsers
        .updateOne({ _id: uid },
          {
            $set: {
              dialogs: ['maturing kolo-seed'],
              home: {
                context: 'kolo-seed-maturing',
                doms,
                events
              }
            }
          })
          .then(() => 
            dbUsers
              .aggregate(userRelated(uid, lang, [
                'context', 'dialogs', 'doms', 'events']))            
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
                const { dialogs, doms, events } = user[0]
                resolve({
                  dialogs,
                  doms,
                  events
                })
              }))
          .catch(err => reject(err))
        })
  })
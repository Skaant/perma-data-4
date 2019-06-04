const getUpdatedUser = require('./getUpdatedUser/getUpdatedUser')
const userRelated = require('../../../../../../../../_aggregations/userRelated/userRelated')

module.exports = ({ uid, lang }) => 
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const dbUsers = client.db('prod').collection('users')
      getUpdatedUser(dbUsers, uid, lang)
        .then(updatedUser =>
          dbUsers
            .updateOne({ _id: uid },
              {
                $set: updatedUser
              })
              .then(() => 
                dbUsers
                  .aggregate(userRelated(uid, lang, [
                    'dialogs', 'doms', 'events']))            
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
                    const { home } = updatedUser
                    const { dialogs, doms, events } = user[0]
                    resolve({
                      dialogs,
                      doms,
                      events,
                      home
                    })
                  })))
          .catch(err => reject(err))
        })
  })
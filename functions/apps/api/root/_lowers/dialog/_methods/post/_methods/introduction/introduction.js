const getIntroductionUser = require('./getIntroductionUser/getIntroductionUser')
const userRelated = require('../../../../../../../../_aggregations/userRelated/userRelated')

module.exports = ({ uid, lang }) => 
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const baseUser = getIntroductionUser()
      const dbUsers = client.db('prod').collection('users')
      dbUsers
        .updateOne({ _id: uid },
          {
            $set: baseUser
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
                const { home } = baseUser
                const { dialogs, doms, events } = user[0]
                resolve({
                  dialogs,
                  doms,
                  events,
                  home
                })
              }))
          .catch(err => reject(err))
        })
  })
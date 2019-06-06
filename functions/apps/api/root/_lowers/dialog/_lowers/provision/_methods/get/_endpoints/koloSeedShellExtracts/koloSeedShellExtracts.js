const userExtracts = require('./_aggregations/userExtracts/userExtracts')

module.exports = ({ query }) =>
  new Promise((resolve, reject) => {
    const { uid, lang } = query
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      const dbUsers = client.db('prod').collection('users')
      dbUsers.aggregate(userExtracts(uid, lang))
        .toArray((err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  })
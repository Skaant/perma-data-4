const randomExtracts = require('./_aggregations/randomExtracts/randomExtracts')

module.exports = (uid, pseudo, client) => 
  new Promise((resolve, reject) => {
    client.db('prod').collection('extracts')
      .aggregate(randomExtracts())
      .toArray((err, [ extracts ]) => {
        if (err) {
          reject(err)
        }
        try {
          resolve({
            _id: uid,
            pseudo,
            roles: [],
            dialogs: {
              'introduction': {
                initScope: { extracts }
              }
            },
            extracts: Object.keys(extracts)
              .reduce((extractsArray, key) =>
                extractsArray.concat(extracts[key]), [])
          })
        } catch (err) {
          reject(err)
        }
      })
  })
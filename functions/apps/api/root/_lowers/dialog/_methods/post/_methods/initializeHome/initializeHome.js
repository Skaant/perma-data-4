module.exports = ({ uid, form }) => 
  new Promise((resolve, reject) => {
    if (!form) {
      reject(new Error('missing form'))
    }
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      console.log(uid, form)
      client.db('prod')
        .collection('users')
        .updateOne({ _id: uid },
          {
            $set: {
              home: {
                doms: {
                  'SPARKERS': {
                    'PHOTO-FACTORY': true,
                    'PHOTO-CELLS': 5,
                  }, 'NOVS': {
                    'EXPLORERS': true,
                    'HARVESTERS': true
                  }, 'MIKORIS': {
                    'LOOKOUT': true
                  }
                }
              }
            }
          })
          .then(user => resolve({ user }))
          .catch(err => reject(err))
    })
  })
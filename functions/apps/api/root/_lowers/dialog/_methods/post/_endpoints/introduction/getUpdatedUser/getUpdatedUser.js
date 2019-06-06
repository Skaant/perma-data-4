const doms = require('./doms/doms')
const events = require('./events/events')

module.exports = (dbUsers, uid, lang) => 
  new Promise((resolve, reject) => {
    dbUsers.findOne({
      _id: uid
    })
    .then(user => {
      if (!user || !user.extracts) {
        reject({
          status: 404,
          title: 'user data query error',
          message: 'no user or extracts at the end of the pipeline'
        })
      } else {
        resolve({
          dialogs: {
            'maturing kolo-seed': {}
          },
          home: {
            context: 'kolo-seed-maturing',
            doms: Object.assign({}, doms, {
              'kolo-seed shell': Object.assign({},
                doms['kolo-seed shell'], {
                  extracts: user.extracts
                })
            }),
            events
          },
          extracts: []
        })
      }
    })
  })
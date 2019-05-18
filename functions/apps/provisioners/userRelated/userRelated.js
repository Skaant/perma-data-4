const parseDialogs = require('./parseDialogs/parseDialogs')

module.exports = (db, user, lang) => 
  new Promise((resolve, reject) => {
    const { home, dialogs } = user
    const domsPromise = new Promise((resolve, reject) => {
      if (!home || !home.doms) {
        resolve([])
      }
      db.collection('doms')
        .aggregate([
          {
            $match: {
              _id: {
                $in: Object.keys(home.doms)
              }
            }
          }, {
            $project: {
              _id: 1,
              [lang]: 1
            }
          }
        ])
        .toArray((err, doms) => {
          if (err)
            reject(err)
          resolve(doms)
        })
    })
    const dialogsPromise = new Promise((resolve, reject) =>
      db.collection('dialogs')
        .aggregate([
          {
            $match: {
              _id: {
                $in: dialogs
              }
            }
          }, {
            $project: {
              _id: 1,
              openFirst: 1,
              scenes: 1,
              [lang]: 1,
              disabledNext: 1
            }
          }
        ])
        .toArray((err, dialogs) => {
          if (err)
            reject(err)
          try {
            resolve(parseDialogs(dialogs, lang))
          } catch (_err) {
            reject(_err)
          }
        })
      )
    Promise.all([domsPromise, dialogsPromise])
      .then(([doms, dialogs]) =>
        resolve(Object.assign({}, user, {
          home: Object.assign({}, user.home || {}, { doms }),
          dialogs
        })))
      .catch(err =>
        reject(err))
  })
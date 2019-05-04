const parseDialogs = require('./parseDialogs/parseDialogs')

module.exports = (db, { doms, dialogs }, lang) => 
  new Promise((resolve, reject) => {
    const domsPromise = new Promise((resolve, reject) =>
      db.collection('doms')
        .find({
          _id: {
            $in: Object.keys(doms)
          }
        })
        .toArray((err, doms) => {
          if (err)
            reject(err)
          resolve(doms)
        }))
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
          resolve(parseDialogs(dialogs, lang))
        })
      )
    Promise.all([domsPromise, dialogsPromise])
      .then(([doms, dialogs]) =>
        resolve({
          doms,
          dialogs
        }))
      .catch(err => 
        reject(err))
  })
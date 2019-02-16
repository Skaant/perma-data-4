module.exports = (dbUsers, { _id, pseudo }, uid) =>
  new Promise((resolve, reject) => {
    console.log(_id, pseudo, uid)
    dbUsers
      .insertOne({
        _id: uid,
        pseudo,
        roles: []
      })
      .then(({ ops }) => {
        console.log(ops)
        dbUsers.deleteOne({ _id })
          .then(() => resolve(ops[0]))
          .catch(err => reject(err))
        })
      .catch(err => reject(err))
  })
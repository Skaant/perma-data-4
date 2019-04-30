// validate user is to switch first PUT id:email to id:uid

module.exports = (dbUsers, { _id, pseudo }, uid) =>
  new Promise((resolve, reject) => {
    dbUsers
      .insertOne({
        _id: uid,
        pseudo,
        roles: [],
        dialogs: {
          current: '5cc83f241c9d4400004754bf',
          availables: []
        }
      })
      .then(({ ops }) => {
        dbUsers.deleteOne({ _id })
          .then(() => resolve(ops[0]))
          .catch(err => reject(err))
        })
      .catch(err => reject(err))
  })
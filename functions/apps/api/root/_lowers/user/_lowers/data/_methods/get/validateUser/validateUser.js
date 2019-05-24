const ObjectId = require('mongodb').ObjectId
// validate user is to switch first PUT id:email to id:uid

module.exports = (dbUsers, { _id, pseudo }, uid) =>
  new Promise((resolve, reject) => {
    const user = {
      _id: uid,
      pseudo,
      roles: [],
      dialogs: ['introduction']
    }
    dbUsers
      .insertOne(user)
        .then(() => 
          dbUsers.deleteOne({ _id })
            .then(() => resolve(user))
            .catch(err => reject(err)))
        .catch(err => reject(err))
  })
    
const getNewUser = require('./getNewUser/getNewUser')

// validate user is to switch first PUT id:email to id:uid
module.exports = (dbUsers, user, client) =>
  new Promise((resolve, reject) => {
    const { uid, pseudo, email } = user
    getNewUser(uid, pseudo, client)
      .then(_user =>
        dbUsers
          .insertOne(_user)
            .then(() => 
              dbUsers.deleteOne({
                _id: email
              })
                .then(() => resolve(_user))
                .catch(err => reject(err)))
            .catch(err => reject(err)))
      .catch(err => reject(err))
  })
    
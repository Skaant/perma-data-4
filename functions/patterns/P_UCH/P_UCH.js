module.exports = ({ uid, email }) =>
  new Promise((resolve, reject) => {
    fetch(`/api/user/data?uid=${ uid }`)
      .then(result => result.json())
      .then(({ user }) => resolve(Object.assign({}, { email }, user)))
      .catch(err => reject(err))
  })
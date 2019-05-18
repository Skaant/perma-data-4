module.exports = ({ uid, email }, lang) =>
  new Promise((resolve, reject) => {
    fetch(`/api/user/data?uid=${ uid }&email=${ email }&lang=${ lang }`)
      .then(result => {
        if (result.ok) {
          return result.json()
        } else {
          throw result.json()
        }
      })
      .then((user) => resolve(Object.assign({}, { email }, user)))
      .catch(errPromise =>
        errPromise.then(err => reject(err)))
  })
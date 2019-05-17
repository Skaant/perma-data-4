module.exports = ({ uid, email }, lang) =>
  new Promise((resolve, reject) => {
    fetch(`/api/user/data?uid=${ uid }&email=${ email }&lang=${ lang }`)
      .then(result => result.json())
      .then((user) => resolve(Object.assign({}, { email }, user)))
      .catch(err => reject(err))
  })
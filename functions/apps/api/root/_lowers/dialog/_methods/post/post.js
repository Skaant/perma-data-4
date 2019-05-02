const _methods = require('./_methods')

module.exports = req =>
  new Promise((resolve, reject) => {
    const body = JSON.parse(req.body)
    _methods[body.key](body)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
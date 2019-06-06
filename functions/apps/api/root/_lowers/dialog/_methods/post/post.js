const _endpoints = require('./_endpoints')

module.exports = req =>
  new Promise((resolve, reject) => {
    const body = JSON.parse(req.body)
    _endpoints[body.key](body)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
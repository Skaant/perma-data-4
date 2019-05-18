const pug = require('pug')

module.exports = (err, res) => {
  res
    .status(err.status || 500)
    .send(err)
}
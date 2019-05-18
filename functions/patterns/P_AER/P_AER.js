const pug = require('pug')

module.exports = (err, res) => {
  console.log(err)
  res
    .status(err.status || 500)
    .send(err)
}
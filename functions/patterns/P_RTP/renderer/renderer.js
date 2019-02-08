const pug = require('pug')

module.exports = props =>
  pug.renderFile('./pug/html/html.pug', props)
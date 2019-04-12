const pug = require('pug')

module.exports = props => {
  try {
    return pug.renderFile('./pug/html/html.pug', props)
  } catch (err) {
    const splitMessage = err.message.split(/\r?\n/)
    throw {
      status: '500',
      title: splitMessage[splitMessage.length - 1],
      message: splitMessage[0]
    }
  }
}
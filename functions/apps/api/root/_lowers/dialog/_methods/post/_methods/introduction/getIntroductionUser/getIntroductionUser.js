const doms = require('./doms/doms')
const events = require('./events/events')

module.exports = () => ({
  dialogs: {
    'maturing kolo-seed': {}
  },
  home: {
    context: 'kolo-seed-maturing',
    doms,
    events
  },
  extracts: []
})
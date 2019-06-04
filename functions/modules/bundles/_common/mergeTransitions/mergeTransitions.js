export default (commons, specifics) =>
  Object.keys(commons)
    .reduce((transitions, key) => {
      transitions[key] = props => {
        commons && typeof commons[key] === 'function' && commons[key](props)
        specifics && typeof specifics[key] === 'function' && specifics[key](props)
      }
      return transitions
    }, {})
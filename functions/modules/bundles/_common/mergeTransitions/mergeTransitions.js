export default (commons, specifics) =>
  ['bundle received', 'bundle error',
    'bundle data fetch', 'bundle data provisioned',
    'unauth app', 'bundle data error',
    'user authenticated', 'user authenticated error',
    'user data fetch', 'user data provisioned',
    'auth app', 'user data error'].reduce((transitions, key) => {
      transitions[key] = props => {
        commons && typeof commons[key] === 'function' && commons[key](props)
        specifics && typeof specifics[key] === 'function' && specifics[key](props)
      }
      return transitions
    }, {})
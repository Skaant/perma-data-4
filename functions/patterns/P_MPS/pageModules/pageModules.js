const aggregateCommons = (specifics = []) =>
  ['plantSearch', 'userPanel', 'loginForm', 'dialog', 'citeZum'].concat(specifics)

module.exports = id => {
  switch (id) {
    case 'home':
      return aggregateCommons(['userHome'])
    default:
      return aggregateCommons()
  }
}
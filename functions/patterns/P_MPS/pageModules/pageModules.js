const aggregateCommons = (specifics = []) =>
  ['plantSearch', 'userPanel', 'loginForm'].concat(specifics)

module.exports = id => {
  switch (id) {
    case 'home':
      return aggregateCommons(['dialog', 'userHome'])
    default:
      return aggregateCommons()
  }
}
const aggregateCommons = (specifics = []) =>
  ['plantSearch', 'userPanel', 'loginForm'].concat(specifics)

module.exports = id => {
  switch (id) {
    default:
      return aggregateCommons()
  }
}
const aggregateCommons = (specifics = []) =>
  ['plantSearch', 'userPanel'].concat(specifics)

module.exports = id => {
  switch (id) {
    default:
      return aggregateCommons()
  }
}
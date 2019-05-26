const _facets = require('./_facets')

module.exports = (lang, options) => {
  if (!options) {
    return Object.keys(_facets)
      .reduce((facets, key) => {
        facets[key] = _facets[key](lang)
        return facets
      }, {})
  } else {
    return options.reduce((facets, key) => {
      facets[key] = _facets[key](lang)
      return facets
    }, {})
  }
}
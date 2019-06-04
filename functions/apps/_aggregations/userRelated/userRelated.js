const facetFactory = require('./facetFactory/facetFactory')

module.exports = (uid, lang, options) => ([
  {
    '$match': {
      '_id': uid
    }
  }, {
    '$facet': facetFactory(lang, options)
  }
])
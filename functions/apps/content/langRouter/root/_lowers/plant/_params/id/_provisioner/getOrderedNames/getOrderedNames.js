const getPlantNames = require('./getPlantNames/getPlantNames')

module.exports = (result, lang) =>
  Object.keys(result.plants)
    .reduce((names, _id) => {
      names[_id] = getPlantNames(result, lang)
      return names
    }, {})
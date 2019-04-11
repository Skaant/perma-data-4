const getPlantNames = require('./getPlantNames/getPlantNames')

module.exports = (result, lang) =>
  Object.keys(result.plants)
    .reduce((names, _id) => {
      names[_id] = getPlantNames(result.plants[_id], result, lang)
      return names
    }, {})
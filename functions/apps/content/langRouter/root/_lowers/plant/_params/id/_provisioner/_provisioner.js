const getByIdWithDatas = require('../../../../../../../../provisioners/plant/getByIdWithDatas/getByIdWithDatas')
const getOrderedNames = require('./getOrderedNames/getOrderedNames')
const P_CLO = require('../../../../../../../../../patterns/P_CLO/P_CLO')
const clouds = require('./clouds/index')

module.exports = props =>
  new Promise((resolve, reject) => {
    const { lang, params } = props
    const { id } = params
    getByIdWithDatas(id)
      .then(result =>
        resolve(Object.assign({}, props, result, {
          names: getOrderedNames(result, lang),
          clouds: P_CLO(clouds, props)
        })))
      .catch(err => reject({
        title: err,
        message: `plant with id "${ id }" couldn't be found`,
        status: 404
      }))
  })
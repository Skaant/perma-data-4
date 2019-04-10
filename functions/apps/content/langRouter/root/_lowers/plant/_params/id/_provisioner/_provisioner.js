const getByIdWithDatas = require('../../../../../../../../provisioners/plant/getByIdWithDatas/getByIdWithDatas')
const orderName = require('./orderName/orderName')

module.exports = props =>
  new Promise((resolve, reject) => {
    const { id } = props.params
    getByIdWithDatas(id)
      .then(result => {
        const { plants } = result
        resolve(Object.assign({}, props, result, {
          names: Object.keys(plants)
            .reduce((names, _id) => {
              names[_id] = orderName(plants[_id], result, props.lang)
              return names
            }, {})
        }))
      })
      .catch(err => reject(err))
  })
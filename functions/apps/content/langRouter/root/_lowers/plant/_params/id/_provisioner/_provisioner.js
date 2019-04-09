const getByIdWithDatas = require('../../../../../../../../provisioners/plant/getByIdWithDatas/getByIdWithDatas')

module.exports = props =>
  new Promise((resolve, reject) => {
    const { id } = props.params
    getByIdWithDatas(id)
      .then(result => {
        const { plant, datas } = result
        const names = datas[plant._id].filter(data => data.type === `name.${ props.lang }`)
          .sort((a, b) => b.weight - a.weight)
        const name = names.length > 0 ? names[0].value : id
        resolve(Object.assign({}, props, Object.assign({}, result, {
          plant: Object.assign({}, plant, { name })
        })))
      })
      .catch(err => reject(err))
  })
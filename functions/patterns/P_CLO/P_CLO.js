module.exports = (clouds, { plant, datas, types }, props) =>
  Object.keys(clouds).map(key => {
    const cloud = clouds[key](props)
    return cloud.types.reduce((cloudDatas, type) => {
      const typeDatas = types[type]
      cloudDatas.datas = cloudDatas.datas.concat(typeDatas
        .filter(data => (!cloud.parent && datas[data].plants === plant._id)
          && !cloudDatas.datas.includes(data)))
      return cloudDatas
    }, {
      key,
      datas: []
    })
  })
    
module.exports = ({ plant, plants, types, datas }, lang) => {
  const type = `name.${ lang }`
  return types[type].filter(_id => plants[plant._id].includes(_id))
    .map(_id => {
      const { value, weight } = datas[_id]
      return {
        value,
        weight
      }
    })
    .sort((a, b) => b.weight - a.weight)
    .map(({ value }) => value)
}
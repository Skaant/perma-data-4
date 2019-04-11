module.exports = (plant, { types, datas }, lang) => {
  const type = `name.${ lang }`
  return plant.filter(_id => datas[_id].plants === plant._id)
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
module.exports = (clouds, props) =>
  Object.keys(clouds).reduce((objectCloud, key) => { 
    objectCloud[key] = clouds[key](props)
    return objectCloud
  }, {})
    
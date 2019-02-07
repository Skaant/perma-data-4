const { Router } = require('express')

const P_RCL = ({ _currents = {}, _lowers = {} }) => {
  const router = Router()

  // 1. add '/' methods (type = key, handler = value)
  Object.keys(_currents)
    .map(key => router
      .route('/')[key](_currents[key]))

  // 2. add a new sub route level (path = key, router = value)
  Object.keys(_lowers)
    .map(key => router
      .use(`/${ key }`, P_RCL(_lowers[key])))
      
  return router
}

module.exports = P_RCL
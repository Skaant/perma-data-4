const { Router } = require('express')

const P_RCL = ({ _current, _lowers = {} }) => {
  const router = Router()

  // 1. add '/' get method
  router.route('/')
    .get(_current)

  // 2. add a new sub route level (path = key, router = value)
  Object.keys(_lowers)
    .map(key => router
      .use(`/${ key }`, P_RCL(_lowers[key])))
      
  return router
}

module.exports = P_RCL
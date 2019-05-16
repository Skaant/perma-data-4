const { Router } = require('express')
const P_RTP = require('../P_RTP/P_RTP')
const P_DDA = require('../P_DDA/P_DDA')

const P_RCL = ({ _current, _params, _methods, _lowers = {} }) => {
  const router = Router()

  // 1. if (_current) add '/' get method
  if (_current) {
    router.route('/')
      .get(P_RTP(_current))
  }

  if (_params && typeof _params === 'object') {
    Object.keys(_params)
      .map(key =>
        router.route(`/:${ key }`)
          .get(P_RTP(_params[key])))
  }

  if (_methods && typeof _methods === 'object') {
    Object.keys(_methods)
      .map(key =>
        router.route('/')
          [key](P_DDA(_methods[key])))
  }

  // 3. add a new sub route level (path = key, router = value)
  Object.keys(_lowers)
    .map(key => router
      .use(`/${ key }`, P_RCL(_lowers[key])))

  router.use('/*', P_RTP({}))
      
  return router
}

module.exports = P_RCL
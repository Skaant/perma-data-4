const P_RCL = require('../P_RCL')

module.exports = (router, _lowers = {}) => {
  console.log('low', _lowers, P_RCL)
  Object.keys(_lowers)
    .map(key => router
      .use(`${ key }`, P_RCL(_lowers[key])))
  return router
}
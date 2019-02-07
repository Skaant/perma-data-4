module.exports = (router, _currents = {}) => {
  console.log('cur', _currents)
  Object.keys(_currents)
    .map(key => router
      .route('/')[key](_currents[key]))
  return router
}
const { Router } = require('express')
const langRefs = require('./langRefs/langRefs')
const P_RCL = require('../../../patterns/P_RCL/P_RCL')
const P_RTP = require('../../../patterns/P_RTP/P_RTP')
const root = require('./root/root')

module.exports = () => {
  const router = Router()
  const rootRouter = P_RCL(root)
  langRefs.map(lang => router.use(`/${ lang }`, rootRouter))
  router.use('/*', P_RTP({}))
  return router
}
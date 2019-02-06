const { Router } = require('express')
const langRefs = require('./langRefs/langRefs')
const root = require('./root/root')

module.exports = app => {
  const router = Router()
  const rootRouter = root()
  langRefs.map(lang => router.use(`/${ lang }`, rootRouter))
  app.use(router)
  return app
}
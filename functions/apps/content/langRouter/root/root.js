const { Router } = require('express')
const home = require('./home/home')
const plant = require('./plant/plant')
const inventory = require('./inventory/inventory')
const contributor = require('./contributor/contributor')

module.exports = () => {
  const router = Router()
  router.route('/').get(home)
  router.route('/plant').get(plant)
  router.route('/inventory').get(inventory)
  router.route('/contributor').get(contributor)
  return router
}
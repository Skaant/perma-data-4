const express = require('express')
const P_RCL = require('../../patterns/P_RCL/P_RCL')
const root = require('./root/root')

const app = express()

const targetRouter = express.Router()
targetRouter.use(P_RCL(root))
app.use('/api', targetRouter)

module.exports = app
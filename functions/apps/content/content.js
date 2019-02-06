const express = require('express')
const middlewares = require('./middlewares/middlewares')
const langRouter = require('./langRouter/langRouter')

const app = langRouter(middlewares(express()))

module.exports = app
const express = require('express')
const middlewares = require('./middlewares/middlewares')
const langRouter = require('./langRouter/langRouter')

const app = middlewares(express())

app.use(langRouter())

module.exports = app
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const MongoClient = require('mongodb').MongoClient
const mongoConfig = require('./mongo.config')
const { api, content } = require('./apps/apps')

admin.initializeApp(functions.config().firebase)
global.firestore = admin.firestore()

global.mongo = new MongoClient(mongoConfig.url, {
  useNewUrlParser: true
})
  
exports.api = functions.https.onRequest(api)
exports.content = functions.https.onRequest(content)

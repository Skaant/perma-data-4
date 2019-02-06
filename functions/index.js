const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { api, content } = require('./apps/apps')

admin.initializeApp(functions.config().firebase)
global.db = admin.firestore()
global.db.settings({ timestampsInSnapshots: true })

exports.api = functions.https.onRequest(api)
exports.content = functions.https.onRequest(content)

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../../firebase.config'
import commons from './_transitions'
import initWindowProps from './initWindowProps/initWindowProps'
import initWindowState from './initWindowState/initWindowState'
import mergeTransitions from './mergeTransitions/mergeTransitions'
import bundleProvisioning from './bundleProvisioning/bundleProvisioning'
import userDataProvisioning from './userDataProvisioning/userDataProvisioning'

// common module intialization
export default specifics => {
  initWindowProps()
  initWindowState()
  const transitions = mergeTransitions(commons, specifics)
  try {
    firebase.initializeApp(firebaseConfig)
    transitions['bundle received']()
  } catch (err) {
    transitions['bundle init error'](err)
  }

  transitions['bundle data fetch']()
  bundleProvisioning(window.__PROPS__.id, window.__PROPS__.lang)
    .then(bundle => {
      window.__STATE__.bundle = bundle
      transitions['bundle data provisioned']()
      if (window.__STATE__.user) {
        if (window.__STATE__.user.data) {
          transitions['auth app']()
        }
      } else {
        transitions['unauth app']()
      }
    })
    .catch(err => {
      transitions['unauth app'](err)
    })

  // user authentication listener
  firebase.auth().onIdTokenChanged(user => {
    if (user) {
      transitions['user authenticated']()
      window.__STATE__.user = user
      transitions['user data fetch']
      userDataProvisioning(window.__STATE__.user, window.__PROPS__.lang)
        .then(data => {
          window.__STATE__.user.data = data
          if (window.__STATE__.bundle) {
            transitions['auth app']()
          }
        })
        .catch(err => transitions['user data error'](err))
      if (window.__STATE__.bundle) {
      }
    } else {
      window.__STATE__.user = false
      if (window.__STATE__.bundle) {
        transitions['unauth app']
      }
    }
  })
}
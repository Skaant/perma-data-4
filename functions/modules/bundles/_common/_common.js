import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../../firebase.config'
import commons from './_transitions'
import initWindowProps from './initWindowProps/initWindowProps'
import initWindowState from './initWindowState/initWindowState'
import mergeTransitions from './mergeTransitions/mergeTransitions'
import bundleProvisioning from './bundleProvisioning/bundleProvisioning'
import userDataProvisioning from './userDataProvisioning/userDataProvisioning'
import updateUserFactory from './_transitions/_helpers/updateUserFactory/updateUserFactory'

// common module intialization
export default specifics => {
  initWindowProps()
  initWindowState()
  window.__METHODS__ = {}
  const transitions = mergeTransitions(commons, specifics)
  try {
    transitions['bundle received']()
    firebase.initializeApp(firebaseConfig)
    transitions['bundle data fetch']()

    bundleProvisioning(window.__PROPS__.id, window.__PROPS__.lang)
      .then(bundle => {
        try {
          window.__STATE__.bundle = bundle
          transitions['bundle data provisioned']()
          if (window.__STATE__.user) {
            try {
              if (window.__STATE__.user.data) {
                transitions['auth app']()
              }
            } catch (err) {
              transitions['user authenticated error'](err)
            }
          } else {
            transitions['unauth app']()
          }
        } catch (err) {
          transitions['bundle error'](err)
        }
      })
      .catch(err => transitions['bundle data error'](err))

    // user authentication listener
    firebase.auth().onIdTokenChanged(user => {
      delete window.__STATE__.dialogs
      if (user) {
        try {
          transitions['user authenticated']()
          window.__STATE__.user = user
          transitions['user data fetch']

          userDataProvisioning(window.__STATE__.user, window.__PROPS__.lang)
            .then(data => {
              try {
                window.__METHODS__.updateUser = updateUserFactory(transitions['user updated'])
                window.__STATE__.user.data = data
                transitions['user data provisioned']()
                if (window.__STATE__.bundle) {
                  transitions['auth app']()
                }
              } catch (err) {
                transitions['user authenticated error'](err)
              }
            })
            .catch(err =>
              transitions['user data error'](err))
        } catch (err) {
          transitions['user authenticated error'](err)
        }
      } else {
        try {
          window.__STATE__.user = false
          if (window.__STATE__.bundle) {
            transitions['unauth app']()
          }
        } catch(err) {
          transitions['bundle error'](err)
        }
      }
    })
  } catch (err) {
    transitions['bundle error'](err)
  }
}
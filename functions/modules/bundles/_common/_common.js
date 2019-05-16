import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../../firebase.config'
import commons from './_transitions'
import P_MPC from '../../../patterns/P_MPC/P_MPC'
    
const html = document.getElementsByTagName('html')[0]
const lang = html.lang
const id = html.id

const userChange = (user, specifics, translations) => {
  if (user) {
    commons.signIn(user, specifics && specifics.signIn, translations, lang)
  } else {
    commons.signOut(specifics && specifics.signOut)
  }
}

const selectPlant = plant =>
  document.location.href =
    `/${ lang }/plant/${ plant}`

// common module intialization

export default specifics => {
  firebase.initializeApp(firebaseConfig)

  new Promise((resolve, reject) => {
    commons.bundleStart(specifics && specifics.bundleStart)

    P_MPC(id, lang)
      .then(({ translations }) => {
        commons.bundleProvisioned(specifics && specifics.start, id,
          selectPlant, userChange, translations)

        firebase.auth().onIdTokenChanged(user =>
          userChange(user, specifics, translations))

        resolve()
      })
      .catch(err => reject(err))
  })
}
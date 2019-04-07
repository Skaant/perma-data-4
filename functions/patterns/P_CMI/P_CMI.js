import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../firebase.config'
import commons from './_transitions'
import P_MPC from '../P_MPC/P_MPC'
    
const html = document.getElementsByTagName('html')[0]
const lang = html.lang
const id = html.id

const userChange = (user, specifics, translations) => {
  if (user) {
    commons.signIn(user, specifics && specifics.signIn, translations)
  } else {
    commons.signOut(specifics && specifics.signOut)
  }
}

const selectPlant = plant =>
  document.location.href =
    `/${ lang }/plant/${ plant}`

// common module intialization

export default specifics => 
  new Promise((resolve, reject) => {      
    firebase.initializeApp(firebaseConfig)

    $('.loading-bundle')
      .html(loadingTexts.lang)

    P_MPC(id, lang)
      .then(({ translations }) => {
        firebase.auth().onAuthStateChanged(user =>
          userChange(user, specifics, translations))

        commons.start(specifics && specifics.start, id,
          selectPlant, userChange, translations)

        resolve()
      })
      .catch(err => reject(err))
  })
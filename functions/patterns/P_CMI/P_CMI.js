import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../firebase.config'
import PlantSearch from '../../modules/react/PlantSearch/PlantSearch'
import LoginFormModal from '../../modules/react/LoginFormModal/LoginFormModal'
import UserPanel from '../../modules/react/UserPanel/UserPanel'
import P_MPC from '../P_MPC/P_MPC'
import P_UCH from '../P_UCH/P_UCH'

export default (specificsBase, specificsAuth, specificsOut) => 
  new Promise((resolve, reject) => {
    firebase.initializeApp(firebaseConfig)
    
  const html = document.getElementsByTagName('html')[0]
  const lang = html.lang
  const id = html.id

  const userChange = (user, translations) => {
    if (user) {
      P_UCH(user)
        .then(provisionedUser => {
          Array.from(document.getElementsByClassName('auth-none'))
            .forEach(element => $(element).addClass('d-none'))
          Array.from(document.getElementsByClassName('auth-none'))
            .forEach(element => $(element).removeClass('d-none'))
            
          specificsAuth && specificsAuth(user, translations)

          render(<UserPanel user={ provisionedUser }/>, document.getElementById('anchor-user-panel'))

          $('#login-modal').modal('hide')
        })
    } else {
      Array.from(document.getElementsByClassName('auth-none'))
        .forEach(element => $(element).removeClass('d-none'))
      Array.from(document.getElementsByClassName('auth-none'))
        .forEach(element => $(element).addClass('d-none'))

      specificsOut && specificsOut(translations)
    }
  }

  const selectPlant = plant =>
    document.location.href =
      `/${ lang }/plant/${ plant}`

  P_MPC(id, lang)
    .then(({ translations }) => {
      firebase.auth().onAuthStateChanged(user =>
        userChange(user, translations))
      
        specificsBase && specificsBase(translations)

      Array.from(document.getElementsByClassName('anchor-plant-search'))
        .forEach(element => render(<PlantSearch
            translations={ translations.plantSearch }
            selectPlant={ selectPlant }/>,
          element))

      render(<LoginFormModal updateUser={ userChange }
          translations={ translations.loginForm }/>,
        document.getElementById('anchor-login-form'))

      $(document)
        .ready(() => {
          $('#login-button')
            .click(() => $('#anchor-login-form').modal('toggle'))
          if (id !== 'home') {
            $('#search-plant-button')
              .click(() => $('#search-plant-modal').modal('toggle'))
            $('#search-plant-button-container')
              .removeClass('d-none')
          } else {
            $('#home-login-button')
              .click(() => $('#anchor-login-form').modal('toggle'))
          }
          resolve()
        })
    })
    .catch(err => reject(err))
  })
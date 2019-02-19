import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../firebase.config'
import PlantSearch from '../../modules/react/PlantSearch/PlantSearch'
import LoginForm from '../../modules/react/LoginForm/LoginForm'
import UserPanel from '../../modules/react/UserPanel/UserPanel'
import P_MPC from '../P_MPC/P_MPC'
import P_UCH from '../P_UCH/P_UCH'

export default () => 
  new Promise((resolve, reject) => {
    firebase.initializeApp(firebaseConfig)
    
  const html = document.getElementsByTagName('html')[0]
  const lang = html.lang
  const id = html.id

  const userChange = user => {
    if (user) {
      P_UCH(user)
        .then(provisionedUser => {
          $('#login-modal').modal('hide')
          $('#login-button-container').addClass('d-none')
          render(<UserPanel user={ provisionedUser }/>, document.getElementById('anchor-user-panel'))
          $('#anchor-user-panel').removeClass('d-none')
        })
    } else {
      $('#anchor-user-panel').addClass('d-none')
      $('#login-button-container').removeClass('d-none')
    }
  }

  firebase.auth().onAuthStateChanged(user =>
    userChange(user))

  const selectPlant = plant =>
    document.location.href =
      `/${ lang }/plant/${ plant}`

  P_MPC(id, lang)
    .then(({ translations }) => {
      Array.from(document.getElementsByClassName('anchor-plant-search'))
        .forEach(element => render(<PlantSearch
            translations={ translations.plantSearch }
            selectPlant={ selectPlant }/>,
          element))

      render(<LoginForm updateUser={ userChange }
          translations={ translations.loginForm }/>,
        document.getElementById('anchor-login-form'))

      $(document)
        .ready(() => {
          $('#login-button')
            .click(() => $('#anchor-login-form').modal('toggle'))
          
          resolve()
        })
    })
    .catch(err => reject(err))
  })
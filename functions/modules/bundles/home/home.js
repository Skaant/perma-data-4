import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
import firebaseConfig from '../../../firebase.config'
import PlantSearch from '../../react/PlantSearch/PlantSearch'
import LoginForm from '../../react/LoginForm/LoginForm'
import UserPanel from '../../react/UserPanel/UserPanel'
import P_MPC from '../../../patterns/P_MPC/P_MPC'

firebase.initializeApp(firebaseConfig)

const html = document.getElementsByTagName('html')[0]
const lang = html.lang
const id = html.id

const userChange = user => {
  if (user) {
    $('#login-modal').modal('hide')
    $('#login-button-container').addClass('d-none')
    render(<UserPanel user={ user }/>, document.getElementById('anchor-user-panel'))
    $('#anchor-user-panel').removeClass('d-none')
  } else {
    $('#anchor-user-panel').addClass('d-none')
    $('#login-button-container').removeClass('d-none')
  }
}

const selectPlant = plant =>
  document.location.href =
    `/${ lang }/plant/${ plant}`

P_MPC(id, lang)
  .then(({ translations }) => {
    render(<LoginForm updateUser={ userChange }/>,
      document.getElementById('anchor-login-form'))
    
    Array.from(document.getElementsByClassName('anchor-plant-search'))
      .forEach(element => render(<PlantSearch
        translations={ translations.plantSearch }
        selectPlant={ selectPlant }/>, element))
    
    $(document)
      .ready(() => {
        $('#login-button')
          .click(() => $('#login-modal').modal('show'))
      })
  })
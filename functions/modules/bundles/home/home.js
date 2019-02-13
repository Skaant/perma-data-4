import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
import firebaseConfig from '../../../firebase.config'
import PlantSearch from '../../react/PlantSearch/PlantSearch'
import LoginForm from '../../react/LoginForm/LoginForm'
import UserPanel from '../../react/UserPanel/UserPanel'

firebase.initializeApp(firebaseConfig)

const html = document.getElementsByTagName('html')[0]
const lang = html.lang

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

$(document)
  .ready(() => {
    $('#login-button')
      .click(() => $('#login-modal').modal('show'))
  })

render(<LoginForm updateUser={ userChange }/>,
  document.getElementById('anchor-login-form'))

Array.from(document.getElementsByClassName('anchor-plant-search'))
  .forEach(element => render(<PlantSearch
    selectPlant={ plant => document.location.href =
      `/${ lang }/plant/${ plant._id }` }
  />, element))
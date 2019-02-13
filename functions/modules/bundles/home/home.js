import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
import firebaseConfig from '../../../firebase.config'
import PlantSearch from '../../react/PlantSearch/PlantSearch'
import LoginForm from '../../react/LoginForm/LoginForm'

firebase.initializeApp(firebaseConfig)

const html = document.getElementsByTagName('html')[0]
const lang = html.lang

$(document)
  .ready(() => {
    $('#login-button')
      .click(() => $('#login-modal').modal('show'))
  })

render(<LoginForm updateUser={ user => console.log(user) }/>,
  document.getElementById('anchor-login-form'))

Array.from(document.getElementsByClassName('anchor-plant-search'))
  .forEach(element => render(<PlantSearch
    selectPlant={ plant => document.location.href =
      `/${ lang }/plant/${ plant._id }` }
  />, element))
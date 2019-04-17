import React from 'react'
import { render } from 'react-dom'
import PlantSearch from '../../../../modules/react/PlantSearch/PlantSearch'
import LoginFormModal from '../../../../modules/react/LoginFormModal/LoginFormModal'

export default (
  specific,
  id,
  selectPlant, userChange,
  translations
) => {
  Array.from(document.getElementsByClassName('bundle-false'))
    .forEach(element => $(element).addClass('d-none'))
  Array.from(document.getElementsByClassName('bundle-true'))
    .forEach(element => $(element).removeClass('d-none'))

  specific && specific(translations)

  Array.from(document.getElementsByClassName('anchor-plant-search'))
    .forEach(element => render(<PlantSearch
        translations={ translations.plantSearch }
        selectPlant={ selectPlant }/>,
      element))

  render(<LoginFormModal updateUser={ userChange }
      translations={ translations.loginForm }/>,
    document.getElementById('anchor-login-form'))
  
  $('#login-button')
    .click(() => $('#anchor-login-form').modal('toggle'))
  $('#home-login-button')
    .click(() => $('#anchor-login-form').modal('toggle'))

  if (id === 'home') {
    $('#search-plant-button')
      .click(() => $('#search-plant-modal').modal('toggle'))
  }
}
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
  specific && specific(translations)

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
    })
}
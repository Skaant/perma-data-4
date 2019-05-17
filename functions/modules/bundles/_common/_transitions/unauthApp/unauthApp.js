import React from 'react'
import { render } from 'react-dom'
import LoginFormModal from '../../../../react/LoginFormModal/LoginFormModal'

export default () => {
  render(<LoginFormModal translations={ window.__STATE__.bundle.translations.loginForm }/>,
    document.getElementById('anchor-login-form'))

  $('#login-button')
    .click(() => $('#anchor-login-form').modal('toggle'))
  $('#login-button-container').removeClass('d-none')
  $('#search-plant-button')
    .addClass('btn-light')
    .removeClass('btn-warning')
}
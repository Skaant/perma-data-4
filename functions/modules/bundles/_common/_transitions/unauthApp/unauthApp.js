import React from 'react'
import { render } from 'react-dom'
import LoginFormModal from '../../../../react/LoginFormModal/LoginFormModal'

export default () => {
  render(<LoginFormModal translations={ window.__STATE__.bundle.translations.loginForm }/>,
    document.getElementById('anchor-login-form'))

  $('#anchor-user-panel').addClass('d-none')
  $('#login-button-container').removeClass('d-none')
  $('#search-plant-button')
    .addClass('btn-light')
    .removeClass('btn-warning')
  $('#search-plant-header')
    .addClass('bg-light')
    .removeClass('bg-warning')
}
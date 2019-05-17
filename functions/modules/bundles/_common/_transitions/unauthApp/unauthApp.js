import React from 'react'
import { render } from 'react-dom'
import LoginFormModal from '../../../../react/LoginFormModal/LoginFormModal'

export default () => {
  render(<LoginFormModal updateUser={ userChange }
      translations={ translations.loginForm }/>,
    document.getElementById('anchor-login-form'))

  $('#login-button')
    .click(() => $('#anchor-login-form').modal('toggle'))
  $('#login-button-container').removeClass('d-none')
}
import React from 'react'
import { render } from 'react-dom'
import userDataProvisioning from './userDataProvisioning/userDataProvisioning'
import UserPanel from '../../../../modules/react/UserPanel/UserPanel'

// TODO updateDialogs

export default (user, specific, translations) => {
  Array.from(document.getElementsByClassName('loading-bundle'))
    .forEach(element => $(element)
      .html(loadingTexts.userData))
  Array.from(document.getElementsByClassName('data-loading'))
    .forEach(element => $(element).removeClass('d-none'))
  Array.from(document.getElementsByClassName('auth-true'))
    .forEach(element => $(element).removeClass('d-none'))
  Array.from(document.getElementsByClassName('auth-none'))
    .forEach(element => $(element).addClass('d-none'))
  $('#search-plant-button')
    .addClass('btn-warning')
    .removeClass('btn-outline-light')

  userDataProvisioning(user)
    .then(provisionedUser => {
      Array.from(document.getElementsByClassName('data-loading'))
        .forEach(element => $(element).addClass('d-none'))
      Array.from(document.getElementsByClassName('auth-data'))
        .forEach(element => $(element).removeClass('d-none'))

      specific && specific(user, translations)

      render(<UserPanel user={ provisionedUser }/>, document.getElementById('anchor-user-panel'))
      // todo DialogModal

      $('#anchor-login-form').modal('hide')
    })
}
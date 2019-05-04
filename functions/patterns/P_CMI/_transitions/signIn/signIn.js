import React from 'react'
import { render } from 'react-dom'
import userDataProvisioning from './userDataProvisioning/userDataProvisioning'
import UserPanel from '../../../../modules/react/UserPanel/UserPanel'
import DialogModal from '../../../../modules/react/DialogModal/DialogModal'

window.user = false
window.translations = false

const updateUser = (updates, lang) => {
  const updatedUser = Object.assign({}, window.user, updates)
  window.user = updatedUser

  render(<UserPanel user={ window.user }/>, document.getElementById('anchor-user-panel'))

  const firstDialog = updatedUser.dialogs.find(dialog => dialog.openFirst)
  if (firstDialog) {
    render(<DialogModal dialog={ firstDialog }
        uid={ window.user._id }
        updateUser={ updateUser }
        lang={ lang }
        translations={ window.translations.dialog }/>, document.getElementById('anchor-dialog'))
    $('#anchor-dialog').modal('show')
  }
}

export default (user, specific, translations, lang) => {
  window.translations = translations

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

  userDataProvisioning(user, lang)
    .then(provisionedUser => {
      Array.from(document.getElementsByClassName('data-loading'))
        .forEach(element => $(element).addClass('d-none'))
      Array.from(document.getElementsByClassName('auth-data'))
        .forEach(element => $(element).removeClass('d-none'))

      specific && specific(user, translations)
      
      $('#anchor-login-form').modal('hide')

      updateUser(provisionedUser, lang)
    })
}
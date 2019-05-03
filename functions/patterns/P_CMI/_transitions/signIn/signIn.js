import React from 'react'
import { render } from 'react-dom'
import userDataProvisioning from './userDataProvisioning/userDataProvisioning'
import UserPanel from '../../../../modules/react/UserPanel/UserPanel'
import DialogModal from '../../../../modules/react/DialogModal/DialogModal'

const updateDialog = (dialog, uid, translations) => {
  render(<DialogModal dialog={ dialog }
      uid={ uid }
      updateDialog={ updateDialog }
      translations={ translations }/>, document.getElementById('anchor-dialog'))
  $('#anchor-dialog').modal('toggle')
}

export default (user, specific, translations, lang) => {
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

      render(<UserPanel user={ provisionedUser }/>, document.getElementById('anchor-user-panel'))

      $('#anchor-login-form').modal('hide')
      
      const firstDialog = provisionedUser.dialogs.find(dialog => dialog.openFirst)
      if (firstDialog) {
        updateDialog(firstDialog, provisionedUser._id, translations.dialog)
      }
    })
}
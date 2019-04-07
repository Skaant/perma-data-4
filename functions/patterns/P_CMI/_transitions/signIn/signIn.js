import React from 'react'
import { render } from 'react-dom'
import userDataProvisioning from './userDataProvisioning/userDataProvisioning'
import UserPanel from '../../../../modules/react/UserPanel/UserPanel'

export default (user, specific, translations) => {
  Array.from(document.getElementsByClassName('auth-none'))
    .forEach(element => $(element).addClass('d-none'))
  Array.from(document.getElementsByClassName('auth-true'))
    .forEach(element => $(element).removeClass('d-none'))

  userDataProvisioning(user)
    .then(provisionedUser => {
      specific && specific(user, translations)

      render(<UserPanel user={ provisionedUser }/>, document.getElementById('anchor-user-panel'))

      $('#anchor-login-form').modal('hide')
    })
}
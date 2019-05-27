import React from 'react'
import { render } from 'react-dom'
import UserPanel from '../../../../../react/UserPanel/UserPanel'
import DialogModal from '../../../../../react/DialogModal/DialogModal'
import openDialog from '../openDialog/openDialog'

const closeForm = () => {
  $('#anchor-dialog').modal('hide')
}

const updateUser = (updates = {}) => {
  const updatedData = Object.assign({}, window.__STATE__.user.data, updates)
  window.__STATE__.user.data = updatedData

  render(<UserPanel user={ window.__STATE__.user }
      openDialog={ openDialog }
      translations={ window.__STATE__.bundle.translations.userPanel }/>,
    document.getElementById('anchor-user-panel'))

  const firstDialog = updatedData.dialogs && updatedData.dialogs.find(dialog => dialog.openFirst)
  if (firstDialog) {
    render(<DialogModal dialog={ firstDialog }
        extracts={ updatedData.extracts }
        uid={ window.__STATE__.user.uid }
        updateUser={ updateUser }
        closeForm={ closeForm }
        lang={ window.__PROPS__.lang }
        translations={ window.__STATE__.bundle.translations.dialog }/>,
      document.getElementById('anchor-dialog'))
    $('#anchor-dialog').modal('show')
  } else {
    $('#anchor-dialog').modal('hide')
  }
}

export default updateUser
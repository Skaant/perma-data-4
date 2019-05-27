import React from 'react'
import { render } from 'react-dom'
import UserPanel from '../../../../../react/UserPanel/UserPanel'
import DialogModal from '../../../../../react/DialogModal/DialogModal'
import openExtract from '../openExtract/openExtract'
import openDialog from '../openDialog/openDialog'
import closeDialog from '../closeDialog/closeDialog'

const updateUser = (updates = {}) => {
  const updatedData = Object.assign({}, window.__STATE__.user.data, updates)
  window.__STATE__.user.data = updatedData

  render(<UserPanel user={ window.__STATE__.user }
      openDialog={ openDialog }
      translations={ window.__STATE__.bundle.translations.userPanel }/>,
    document.getElementById('anchor-user-panel'))

  const firstDialog = updatedData.dialogs && updatedData.dialogs.find(dialog => dialog.openFirst)
  if (firstDialog) {
    const user = window.__STATE__.user
    render(<DialogModal dialog={ firstDialog }
        uid={ user.uid }
        updateUser={ updateUser }
        openExtract={ openExtract }
        openDialog={ openDialog }
        closeDialog={ closeDialog }
        lang={ window.__PROPS__.lang }
        translations={ window.__STATE__.bundle.translations.dialog }/>,
      document.getElementById('anchor-dialog'))
    $('#anchor-dialog').modal('show')
  } else {
    $('#anchor-dialog').modal('hide')
  }
}

export default updateUser
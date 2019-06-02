import React from 'react'
import { render } from 'react-dom'
import UserPanel from '../../../../react/UserPanel/UserPanel'
import DialogModal from '../../../../react/DialogModal/DialogModal'
import openExtract from '../_helpers/openExtract/openExtract'
import openDialog from '../_helpers/openDialog/openDialog'
import closeDialog from '../_helpers/closeDialog/closeDialog'

export default updates => {
  const user = window.__STATE__.user
  render(<UserPanel user={ user }
      openDialog={ openDialog }
      translations={ window.__STATE__.bundle.translations.userPanel }/>,
    document.getElementById('anchor-user-panel'))

  const dialogs = user.data.dialogs
  const firstDialog = dialogs && dialogs.find(dialog => dialog.openFirst)
  if (firstDialog) {
    const user = window.__STATE__.user
    render(<DialogModal dialog={ firstDialog }
        uid={ user.uid }
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
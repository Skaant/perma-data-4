import React from 'react'
import { render } from 'react-dom'
import DialogModal from '../../../../../react/DialogModal/DialogModal'
import openExtract from '../openExtract/openExtract'
import closeDialog from '../closeDialog/closeDialog'

const openDialog = () => {
  const lastDialogProps = window.__STATE__.dialogs
    .find(({ current }) => current !== 'extract')
  if (window.__STATE__.dialogs[0]._id !== lastDialogProps._id) {
    const user = window.__STATE__.user
    const lastDialog = user.data.dialogs
      .find(dialog => dialog._id === lastDialogProps._id)
    render(<DialogModal dialog={ lastDialog }
        current={ lastDialogProps.current }
        extracts={ user.data.extracts }
        uid={ user.uid }
        openExtract={ openExtract }
        openDialog={ openDialog }
        closeDialog={ closeDialog }
        lang={ window.__PROPS__.lang }
        translations={ window.__STATE__.bundle.translations.dialog }/>,
      document.getElementById('anchor-dialog'))
    }
  $('#anchor-dialog').modal('show')
}

export default openDialog
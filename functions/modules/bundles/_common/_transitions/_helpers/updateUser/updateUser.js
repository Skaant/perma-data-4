import React from 'react'
import { render } from 'react-dom'
import UserPanel from '../../../../../react/UserPanel/UserPanel'
import DialogModal from '../../../../../react/DialogModal/DialogModal'

const closeForm = () => {
  $('#anchor-dialog').modal('hide')
}

const updateUser = (updates = {}) => {
  const updatedData = Object.assign({}, window.__STATE__.user.data, updates)
  window.__STATE__.user.data = updatedData

  render(<UserPanel user={ window.__STATE__.user }/>, document.getElementById('anchor-user-panel'))

  const firstDialog = updatedData.dialogs.find(dialog => dialog.openFirst)
  if (firstDialog) {
    render(<DialogModal dialog={ firstDialog }
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
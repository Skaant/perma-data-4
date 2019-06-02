import React from 'react'
import { render } from 'react-dom'
import DialogModal from '../../../../../react/DialogModal/DialogModal'
import openDialog from '../openDialog/openDialog'
import closeDialog from '../closeDialog/closeDialog'
import dialogContainerFactory from './dialogContainerFactory/dialogContainerFactory';

const openExtract = _id => {
  const data = window.__STATE__.user.data
  const extract = data && data.extracts
    && data.extracts.find(extract => extract._id === _id)
  if (extract) {
    const user = window.__STATE__.user
    const dialog = dialogContainerFactory(extract)
    render(<DialogModal dialog={ dialog }
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

export default openExtract
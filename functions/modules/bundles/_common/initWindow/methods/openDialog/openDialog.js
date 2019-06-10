import React from 'react'
import { render } from 'react-dom'
import DialogModal from '../../../../../react/DialogModal/DialogModal'
import _sourceGetters from './_sourceGetters'
import _dialogBuilders from './_dialogBuilders'
import getInitialState from './getInitialState/getInitialState'

export default (type, id, options) => {
  const source = _sourceGetters[type](id, options)
  const dialog = _dialogBuilders[type] ?
    _dialogBuilders[type](source, options) : source

  if (dialog) {
    // getInitialState returns :
    //  * history entry if it does exist
    //  * new history entry if not
    const initialState = getInitialState(type, id, options, dialog)

    if (type === 'previous' && dialog && initialState) {
      window.__STATE__.dialogs.history.shift()

    } else if (type !== 'previous') {
      let entryKey
      if (type === 'main') {
        entryKey = `dialog-${ dialog._id }`
      } else if (type === 'dom') {
        entryKey = `${ id }-${ options.dialog }`
      } else {
        entryKey = `${ type }-${ id }`
      }
      const historyEntryIndex = window.__STATE__.dialogs.history
        .indexOf(entry => entry === entryKey)

      // if dialog already has an entry in history
      //  && initialState has been correclty extracted
      if (historyEntryIndex && initialState) {
        // remove previous history entry
        window.__STATE__.dialogs.history =
          window.__STATE__.dialogs.history.slice(0, historyEntryIndex)
            .concat(window.__STATE__.dialogs.history.slice(historyEntryIndex + 1))
      }
      window.__STATE__.dialogs.list[entryKey] = initialState
      window.__STATE__.dialogs.history.unshift(entryKey)
    }
    render(
      <DialogModal dialog={ dialog }
          initialState={ initialState }
          lang={ window.__PROPS__.lang }
          translations={ window.__STATE__.bundle.translations.dialog }/>,
      document.getElementById('anchor-dialog'))
    setTimeout(() =>
      $('#anchor-dialog').modal('show'), 1)
  } else {
    $('#anchor-dialog').modal('hide')
  }
}
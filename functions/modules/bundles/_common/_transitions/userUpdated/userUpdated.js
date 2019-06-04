import React from 'react'
import { render } from 'react-dom'
import UserPanel from '../../../../react/UserPanel/UserPanel'

export default updates => {
  const user = window.__STATE__.user

  render(<UserPanel user={ user }
      translations={ window.__STATE__.bundle.translations.userPanel }/>,
    document.getElementById('anchor-user-panel'))

  window.__METHODS__.openDialog('main')
}
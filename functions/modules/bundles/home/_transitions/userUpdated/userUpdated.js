import React from 'react'
import { render } from 'react-dom'
import UserHome from '../../../../react/UserHome/UserHome'

export default updates => {
  render(<UserHome user={ window.__STATE__.user }
      translations={ window.__STATE__.bundle.translations.userHome }/>,
    document.getElementById('anchor-user-home'))
}
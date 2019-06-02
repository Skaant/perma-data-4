import React from 'react'
import { render } from 'react-dom'
import UserHome from '../../../../react/UserHome/UserHome'

export default () => {
  render(<UserHome user={ window.__STATE__.user }
      translations={ window.__STATE__.bundle.translations.userHome }/>,
    document.getElementById('anchor-user-home'))
    
  $('#unauth-home').addClass('d-none')
  $('#anchor-user-home').removeClass('d-none')
}
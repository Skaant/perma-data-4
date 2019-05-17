import React from 'react'
import { render } from 'react-dom'
import UserHome from '../../../../react/UserHome/UserHome'

export default () => {
  render(<UserHome user={ window.__STATE__.user }
      lang={ window.__PROPS__.lang }/>, document.getElementById('anchor-user-home'))
}
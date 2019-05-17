import React from 'react'
import { render } from 'react-dom'
import UserHome from '../../../../react/UserHome/UserHome'

export default (user, lang) => {
  render(<UserHome user={ user } lang={ lang }/>, document.getElementById('anchor-user-home'))
}
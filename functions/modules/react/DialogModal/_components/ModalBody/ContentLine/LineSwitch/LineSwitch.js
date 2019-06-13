import React from 'react'
import Picture from './Picture/Picture';

export default props => {
  const { type, provisionRequired, data } = props
  if (provisionRequired && !data) {
    // todo add a spinner
  }
  switch (type) {
    case 'picture':
      const { my, source } = props
      return (
        <Picture my={ my }
            source={ source } />
      )
    default:
      return false
  }
}
import React from 'react'

export default ({ my, source }) => (
  <div className={ `row img my-${ my || 3 }` }>
    <img src={ source }/>
  </div>
)
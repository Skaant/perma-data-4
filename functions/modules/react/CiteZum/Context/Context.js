import React from 'react'

export default ({ context, translations }) => (
  <div className='container'>
    <div className='row'>
      <div className='jumbotrong col-12'>
        { translations.welcome[context] }</div>
    </div>
  </div>
)
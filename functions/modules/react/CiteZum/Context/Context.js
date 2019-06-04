import React from 'react'

export default ({ context, translations }) => (
  <div className='container'>
    <div className='row p-4 text-center'>
      <h1 className='col-12 mb-4' style={ {
          fontFamily: 'dayRoman' } }>
        { translations.welcome[context] }</h1>    
    </div>
  </div>
)
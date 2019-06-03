import React from 'react'

export default ({ dom }) => (
  <div className='col-12 col-md-6 col-lg-4 mt-4'>
    <div className='card bg-light'>
      <div className='card-header'>
        { dom[window.__PROPS__.lang].name }</div>
      <div className='card-body'></div>
    </div>
  </div>
)
import React from 'react'

export default ({ event }) => (
  <div className='col-12 col-sm-6 col-md-4 col-xl-2 mt-4'>
    <div className='card bg-light border-warning'>
      <div className='card-body'>
        <h6 className='card-title mb-0'>
          { event[window.__PROPS__.lang].title }</h6>
      </div>
    </div>
  </div>
)
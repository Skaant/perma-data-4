import React from 'react'

export default ({ 
  scene,
  back, next,
  translations
}) => (
  <div className='modal-footer container pl-0'>
    <div className='row w-100 pr-2 pr-3'>
      <button type='button' className='btn btn-secondary col-12 col-sm-5 col-md-3 my-1'
          onClick={ () => back() }>
        { translations.back }
      </button>
      <button type='button' className='btn btn-info col-12 col-sm-5 col-md-3 offset-sm-2 offset-md-6 my-1'
          onClick={ () => next() }>
        { translations.next }
      </button>
    </div>
  </div>
)
import React from 'react'

export default ({
  plant, step,
  selectPlant, digDeeper, dismiss,
  translations
}) => (
  <div className='alert alert-success px-3 pb-3'>
    <div className='row'>
      <p className='col-12 px-4 pt-2'>
        { translations.title }</p></div>
    <div className='row'>
      <div className='col-12 btn-group px-0 d-flex'>
        <button type='button' className='btn btn-warning flex-grow-1'
            onClick={ () => selectPlant(plant._id) }>
          { plant._id }</button>
        {
          step === 1 && (
            <button type='button' className='btn btn-info'
                title={ translations.digDeeper }
                onClick={ () => digDeeper() }>
              ➰</button>
          )
        }
        <button type='button' className='btn btn-danger'
            title={ translations.dismiss }
            onClick={ () => dismiss() }>
          ️✖️</button>
      </div>
    </div>
  </div>
)
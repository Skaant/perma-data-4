import React from 'react'

export default ({
  plant, step,
  nameFormatter,
  selectPlant, digDeeper, dismiss,
  translations
}) => (
  <div className='alert alert-success px-3 pb-3'>
    <div className='row'>
      <p className='col-12 px-4 pt-2'>
        { translations.title } :</p></div>
    <div className='col-12 btn-group px-1 d-flex'>
      <button type='button' className='btn btn-warning flex-grow-1 py-2'
          onClick={ () => selectPlant(plant._id) }>
        { nameFormatter(plant) }</button>
      {
        step === 1 && (
          <button type='button' className='btn btn-info py-2'
              title={ translations.digDeeper }
              onClick={ () => digDeeper() }>
            ➰</button>
        )
      }
      <button type='button' className='btn btn-danger py-2'
          title={ translations.dismiss }
          onClick={ () => dismiss() }>
        ️✖️</button>
    </div>
  </div>
)
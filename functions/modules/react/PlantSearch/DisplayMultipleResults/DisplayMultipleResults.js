import React from 'react'

export default ({
  plants, step,
  nameFormatter,
  selectPlant, digDeeper, dismiss,
  translations
}) => (
  <div className='alert alert-success px-3 pb-3'>
    <div className='row'>
      <p className='col-12 px-4 pt-2'>
        { translations.title }</p></div>
    <div className='col-12 input-group px-0 d-flex'>
      <select className='custom-select flex-grow-1'>
        <option>
          { plants.length } { translations.results }</option>
        {
          plants.map(plant => (
            <option key={ plant._id }
                onClick={ () => selectPlant(plant._id) }>
              { nameFormatter(plant) }</option>
          ))
        }</select>
      <div className='input-group-append'>
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
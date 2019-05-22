import React from 'react'

export default ({
  improvement,
  changeImprovement,
  translations
}) => (
  <div className='alert alert-warning'>
    <div className='row'>
      <p className='col-12'>{ translations.title } :</p></div>
    <div className='row'>
      <div className='col-12 btn-group-vertical' role='group'>
        <button type='button' className={ `btn col-12 ${
            improvement === 'ids' ? 'btn-light' : 'btn-success'
          } py-2` }
            onClick={ () => changeImprovement('ids') }>
          <span className='float-left badge badge-light mt-1'>
            1</span>
          { translations.ids }
          <span className='float-right'>
            ⭐️✨</span></button>
        <button type='button' className={ `btn col-12 ${
            improvement === 'names' ? 'btn-light' : 'btn-info'
          } py-2` }
            onClick={ () => changeImprovement('names') }>
          <span className='float-left badge badge-light mt-1'>
            2</span>
          { translations.names }
          <span className='float-right'>
            ⭐</span></button>
        <button type='button' className={ `btn col-12 ${
            improvement === null ? 'btn-light' : 'btn-secondary'
          } py-2` }
            onClick={ () => changeImprovement(null) }>
          <span className='float-left badge badge-light mt-1'>
            3</span>
          { translations.all }</button></div>
    </div>
  </div>
)
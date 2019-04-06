import React from 'react'

export default ({
  improvement,
  changeImprovement,
  translations
}) => (
  <React.Fragment>
    <div className='row'>
      <p className='col-12'>{ translations.title } :</p></div>
    <div className='row'>
      <div className='col-12 btn-group-vertical' role='group'>
        <button type='button' className={ `btn col-12 ${
            improvement === 'ids' ? 'btn-light' : 'btn-success'
          }` }
            onClick={ () => changeImprovement('ids') }>
          { translations.ids }
            <span className='float-right'>
              ⭐️✨</span></button>
        <button type='button' className={ `btn col-12 ${
            improvement === 'names' ? 'btn-light' : 'btn-info'
          }` }
            onClick={ () => changeImprovement('names') }>
          { translations.names }
            <span className='float-right'>
              ⭐</span></button>
        <button type='button' className={ `btn col-12 ${
            improvement === null ? 'btn-light' : 'btn-secondary'
          }` }
            onClick={ () => changeImprovement(null) }>
          { translations.all }</button></div>
    </div>
  </React.Fragment>
)
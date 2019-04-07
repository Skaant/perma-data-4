import React from 'react'

export default ({
  value, improvement, highlight,
  handleValueChange, handleEnterPress,
  handleImprovementButtonClick,
  changeImprovement,
  searchPlant,
  translations
}) => (
  <div className='alert alert-warning pb-0'>
    <div className='row'>
      <p className='col-12 px-4 pt-2'>{ translations.label } :</p></div>
    <div className='row'>
      <div className='input-group mb-4 col-12'>
        <input type='text'
            placeholder={ translations.placeholder }
            className='form-control'
            value={ value }
            onChange={ e => handleValueChange(e.target.value) }
            onKeyPress={ e => {
              switch (e.charCode) {
                case 13:
                  !(highlight === 'search' && value.length < 3) && handleEnterPress()
                  break;
                case 49:
                  improvement !== 'ids' && changeImprovement('ids')
                  e.preventDefault()
                  break;
                case 50:
                  improvement !== 'names' && changeImprovement('names')
                  e.preventDefault()
                  break;
                case 51:
                  improvement !== null && changeImprovement(null)
                  e.preventDefault()
                  break;
              }
            } } autoFocus={ true }/>
        <div className='input-group-append'>
          <button className={ `btn ${ highlight === 'improvement' ? 'btn-warning' : 'btn-info' }` }
              title={ `${ translations.improvements } !` }
              onClick={ () => handleImprovementButtonClick() }>
            🌟</button>
          <button className={ `btn ${ highlight === 'search' ? 'btn-warning' : 'btn-info' }` }
              title={ translations.search }
              onClick={ () => searchPlant() }
              disabled={ value.length < 3 }>
            ✔️</button>
        </div>
      </div>
    </div>
  </div>
)
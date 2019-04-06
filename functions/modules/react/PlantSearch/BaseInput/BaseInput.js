import React from 'react'

export default ({
  value, improvement, highlight,
  handleValueChange, handleEnterPress,
  handleImprovementButtonClick,
  changeImprovement,
  searchPlant,
  translations
}) => (
  <div className='row'>
    <div className='input-group mb-4 col-12'>
      <input type='text'
          placeholder={ translations.placeholder || 'type plant key here' }
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
                break;
              case 50:
                improvement !== 'names' && changeImprovement('names')
                break;
              case 51:
                improvement !== null && changeImprovement(null)
                break;
            }
          } }/>
      <div className='input-group-append'>
        <button className={ `btn ${ highlight === 'improvement' ? 'btn-warning' : 'btn-info' }` }
            onClick={ () => handleImprovementButtonClick() }>
          🌟</button>
        <button className={ `btn ${ highlight === 'search' ? 'btn-warning' : 'btn-info' }` }
            onClick={ () => searchPlant() }
            disabled={ value.length < 3 }>
          ✔️</button>
      </div>
    </div>
  </div>
)
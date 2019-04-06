import React from 'react'

export default ({
  value, highlight,
  handleValueChange, handleEnterPress,
  handleImprovementButtonClick, searchPlant,
  translations
}) => (
  <div className='row'>
    <div className='input-group mb-4 col-12'>
      <input type='text'
          placeholder={ translations.placeholder || 'type plant key here' }
          className='form-control'
          value={ value }
          onChange={ e => handleValueChange(e.target.value) }
          onKeyPress={
            e => e.charCode === 13 &&
              !(highlight === 'search' && value.length < 3) &&
              handleEnterPress() }/>
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
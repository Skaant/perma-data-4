import React from 'react'
import { render } from 'react-dom'
import PlantSearch from '../../../../react/PlantSearch/PlantSearch'

export default () => {
  Array.from(document.getElementsByClassName('anchor-plant-search'))
    .forEach(element => render(<PlantSearch
        translations={ window.__STATE__.bundle.translations.plantSearch }/>,
      element))

  $('#search-plant-button')
    .click(() => $('#search-plant-modal').modal('toggle'))
  $('#search-plant-button-container').removeClass('d-none')

  if (!window.__STATE__.user) {
    $('#launch-info').addClass('d-none')
  } else if (!window.__STATE__.user.data) {
    $('#launch-info__status')
      .html(window.__loadingTexts__['user data fetch'])
  }
}
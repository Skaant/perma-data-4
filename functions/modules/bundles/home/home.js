import React from 'react'
import { render } from 'react-dom'
import PlantSearch from '../../react/PlantSearch/PlantSearch'

const html = document.getElementsByTagName('html')[0]
const lang = html.lang

Array.from(document.getElementsByClassName('anchor-plant-search'))
  .forEach(element => render(<PlantSearch
    selectPlant={ plant => document.location.href =
      `/${ lang }/plant/${ plant._id }` }
  />, element))
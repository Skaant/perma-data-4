import React from 'react'
import Frast from './Frast/Frast'
import CiteZum from '../CiteZum/CiteZum'
import _staticStyle from './_staticStyle/_staticStyle'

export default ({
  user: {
    data: {
      home: {
        context
      },
      doms,
      events
    }
  },
  translations
}) => {
  return (
    <React.Fragment>
      <style>{ _staticStyle }</style>
      {
        // 'frast' is introduction
        context === 'frast' ? (
          <Frast translations={ translations }/>
        ) : (
          <CiteZum context={ context }
              doms={ doms }
              events={ events }
              translations={ Object.assign({}, translations,
                window.__STATE__.bundle.translations.citeZum) }/>
        )
      }
    </React.Fragment>
  )
}
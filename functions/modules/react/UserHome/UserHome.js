import React from 'react'
import Frast from './Frast/Frast'
import CiteZum from '../CiteZum/CiteZum'

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
}) => (
  <React.Fragment>
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
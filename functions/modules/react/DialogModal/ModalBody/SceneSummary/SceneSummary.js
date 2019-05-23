import React from 'react'
import marked from 'marked'
import _staticStyle from './_staticStyle/_staticStyle'

export default ({ summary, translations }) => (
  <div className='modal-body container p-4 border-top'>
    <div id='scene-summary' className='alert alert-warning container px-4 pt-4 mb-0'>
      <style>{
        _staticStyle }</style>
      <div className='row'>
        <h5 className='col-12 text-center mb-4 mt-3 text-uppercase'>
          <b>{ translations.summary }</b></h5>
      </div>
      {
        summary.map(line => (
          <div className='row px-4'
              key={ line.slice(0, 10) }
              dangerouslySetInnerHTML={ {
                __html: marked(line)
              } }/>
        ))
      }
    </div>
  </div>
)
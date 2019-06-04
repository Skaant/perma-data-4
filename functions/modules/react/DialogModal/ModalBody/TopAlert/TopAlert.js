import React from 'react'
import marked from 'marked'
import _staticStyle from './_staticStyle/_staticStyle'

export default ({ alert }) => (
  <div id='top-alert' 
      className={ `alert alert-${ alert.type || 'success' } px-4 pt-4 mb-4` }>
    <style>
      { _staticStyle }</style>
    {
      alert.title && (
        <div className='row'>
          <h5 className='col-12 text-center mb-4 mt-3 text-uppercase'>
            <b>{ alert.title }</b></h5>
        </div>
      )
    }
    {
      alert.content.map(line => (
        <div key={ line.slice(0, 10) }
            className='row px-4'
            dangerouslySetInnerHTML={ {
          __html: marked(line)
        } }/>
      ))
    }
  </div>
)
import React from 'react'
import marked from 'marked'
import Menu from './Menu/Menu'

export default props => {
  const { dom } = props
  const lang = window.__PROPS__.lang
  const flavour = dom[lang].flavour
  const description = dom[lang].description
  return (
    <div className='col-12 col-md-6 col-lg-4 mt-4'>
      <div className='card bg-light border-dark'>
        <div className='card-header bg-warning text-uppercase'>
          { dom[window.__PROPS__.lang].name }</div>
        {
          flavour && (
            <div className='card-body pb-2 alert-secondary font-weight-light'
                dangerouslySetInnerHTML={ {
                __html: marked(flavour.join('\n\n'))
              } }/>)
        }
        {
          description && (
            <div className='card-body font-weight-light'
                dangerouslySetInnerHTML={ {
                __html: marked(description.join('\n\n'))
              } }/>)
        }
        {
          dom.menu && (
            <div className='card-body'>
              <Menu { ...props }/>
            </div>
          )
        }
      </div>
    </div>
  ) 
}
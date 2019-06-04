import React from 'react'
import marked from 'marked'
import Menu from './Menu/Menu'

export default props => {
  const { event } = props
  const lang = window.__PROPS__.lang
  const flavour = event[lang].flavour
  return (
    <div className='col-12 col-sm-6 col-md-4 col-xl-2 mt-4'>
      <div className='card bg-light border-warning'>
        <div className='card-body'>
          <h6 className='card-title mb-0'>
            { event[lang].title }</h6>
          {
            flavour && (
              <blockquote className='mt-4 text-secondary font-weight-light'
                  dangerouslySetInnerHTML={ {
                  __html: marked(`" -${ flavour.join('\n\n" ') } "`)
                } }/>)
          }
          {
            event.menu && (
              <Menu { ...props }/>
            )
          }
        </div>
      </div>
    </div>
  ) 
}
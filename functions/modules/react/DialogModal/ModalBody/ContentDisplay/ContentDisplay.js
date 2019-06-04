import React from 'react'
import marked from 'marked'

export default ({ content, pictures, source, translations }) => (
  <div className='content-display pb-4 w-100'>
    {
      source && (
        <p className='text-init small font-weight-light text-center mb-4 pb-4'>
          <span className='badge badge-secondary py-1 mr-2'>
            { translations.source }</span>
          { source }</p>
      )
    }
    {
      content.map((line, index) => (
        <React.Fragment key={ line.slice(0, 10) }>
          {
            pictures && pictures[index] && (
              <div className='row img'>
                <img src={ pictures[index] }/>
              </div>

            )
          }
          {
            <div className='row px-4'
                dangerouslySetInnerHTML={ {
                  __html: marked(line)
                } }/>
          }
        </React.Fragment>
      ))
    }
    {
      pictures && pictures[content.length] && (
        <div className='row img'>
          <img src={ pictures[content.length] }/>
        </div>
      )
    }
  </div>
)
import React from 'react'
import marked from 'marked'

export default ({ content, pictures }) => (
  <div className='content-display pb-4 w-100'>
    {
      content.map((line, index) => (
        <React.Fragment key={ line.slice(0, 10) }>
          {
            pictures && pictures[index] && (
              <div className={ `row img${ index === 0 ? ' first' : ''}` }>
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
        <div className='row img last'>
          <img src={ pictures[content.length] }/>
        </div>
      )
    }
  </div>
)
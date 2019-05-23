import React from 'react'
import marked from 'marked'
import _staticStyle from './_staticStyle/_staticStyle'

export default ({ content, pictures }) => (
  <div id='scene-content' className='pb-4'>
    <style>
      { _staticStyle }</style>
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
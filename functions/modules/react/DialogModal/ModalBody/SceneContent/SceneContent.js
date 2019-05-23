import React from 'react'

export default ({ content, pictures }) => 
  content.map((line, index) => (
    <React.Fragment key={ line.slice(0, 10) }>
      {
        pictures && pictures[index] && (
          <div className='row'>
            <img src={ pictures[index] } />
          </div>

        )
      }
      {
        <div className='row px-4'>
          <p>{ line }</p>
        </div>
      }
    </React.Fragment>
  ))
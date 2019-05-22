import React from 'react'

export default ({ scene, extracts }) => (
  <div className='modal-body container py-0'>
    {
      scene.content && (
        <div className='row'>
          <p>{ scene.content }</p>
        </div>
      )
    }
    {
      scene.extracts && (
        <React.Fragment>
          {
            scene.extracts.map(extract => (
              <div key={ extract } className='row'>
                <p>{ extracts[extract] }</p>
              </div>
            ))
          }
        </React.Fragment>
      )
    }
  </div>
)
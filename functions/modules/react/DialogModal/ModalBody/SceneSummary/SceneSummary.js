import React from 'react'

export default ({ summary, translations }) => (
  <div id='scene-summary' className='alert alert-warning container px-4 pt-4 mt-3 mb-0'>
    <style>{ `
      #scene-summary p {
        width: 100%;
        text-align: center;
      }` }
    </style>
    <div className='row'>
      <h4 className='col-12 text-center mb-4 mt-3'>
        { translations.summary }</h4>
    </div>
    {
      summary.map(line => (
        <div className='row px-4'
            key={ line.slice(0, 10) }>
          <p>{ line }</p>
        </div>
      ))
    }
  </div>
)
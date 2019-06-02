import React from 'react'

export default ({ doms }) => (
  <div className='container'>
    <div className='row'>
      <h2 className='col-12 text-center'>
        DOMS</h2>
    </div>
    <div className='row card-deck'>
      {
        doms.map(dom => (
          <div key={ dom._id }
              className='card'>
            { dom[window.__PROPS__.lang].name }</div>
        )) 
      }
    </div>
  </div>
)
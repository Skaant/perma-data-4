import React from 'react'
import DomItem from './DomItem/DomItem';

export default ({ doms }) => (
  <div className='container'>
    <div className='row'>
      <h2 className='col-12 text-center mt-4'>
        DOMS</h2>
    </div>
    <div className='row mb-4'>
      {
        doms.map(dom => (
          <DomItem key={ dom._id }
              dom={ dom }/>
        )) 
      }
    </div>
  </div>
)
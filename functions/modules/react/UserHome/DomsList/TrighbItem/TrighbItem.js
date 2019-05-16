import React from 'react'
import DomItem from './DomItem/DomItem';

export default ({ bolshDom, doms, lang }) => (
  <div className='row alert alert-light'>
    <div className='col-12 mt-4 mb-3'>
      <h5 className='text-dark'>
        { bolshDom._id }</h5>
      <p>{ bolshDom[lang].description }</p>
    </div>
    <div className='col-12 container'>
      {
        doms.map(dom => (
          <DomItem key={ dom._id } lang={ lang } dom={ dom }/>
        ))
      }
    </div>
  </div>
)
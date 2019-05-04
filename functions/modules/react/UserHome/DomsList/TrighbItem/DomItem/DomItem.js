import React from 'react'

export default ({ dom, lang }) => (
  <div className='row alert alert-info '>
    <div className='col-12'>
      <h6 className='text-black mt-3'>
        { dom._id }</h6>
      <p className='text-secondary'>
        { dom[lang].description }</p></div>
  </div>
)
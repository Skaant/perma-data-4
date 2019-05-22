import React from 'react'

export default ({ title, current, pages }) => (
  <h5 className='modal-title text-uppercase text-dark'>
    { title } ({ 
      pages.indexOf(page => page.includes(current))
    }/{ pages.length })</h5>
)
import React from 'react'

export default ({ title, current, pages }) => {
  const pageIndex = pages.findIndex(page => 
    page.includes(current))
  return (
    <h5 className='modal-title text-uppercase text-dark'>
      { title } ({ pageIndex + 1 }/{ pages.length })</h5>
  )
}
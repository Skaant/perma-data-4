import React from 'react'

export default ({ scene, title, current, pages }) => {
  const pageIndex = pages.findIndex(page => 
    page.includes(current))
  return (
    <h5 className='modal-title text-uppercase text-dark'>
      { title } ({ pageIndex + 1 }/{ pages.length }) - { scene.title }</h5>
  )
}
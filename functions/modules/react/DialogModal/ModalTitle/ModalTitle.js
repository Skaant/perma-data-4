import React from 'react'

export default ({ scene, title, current, pages }) => {
  return (
    <h5 className='modal-title text-uppercase text-dark'>
      { title } {
        pages && `(${
          pages.findIndex(page => 
            page.includes(current)) + 1 }/${
          pages.length }) - ${
        // no need to include scene title with extracts
          scene.title }` }</h5>
  )
}
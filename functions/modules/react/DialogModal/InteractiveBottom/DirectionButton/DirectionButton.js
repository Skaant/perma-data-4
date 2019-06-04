import React from 'react'
import getValidClass from '../getValidClass/getValidClass'
import evalClick from '../_eval/evalClick'
import evalStatic from '../_eval/evalStatic'

export default ({ item, props, direction, label, short }) => (
  <React.Fragment>
    { 
      !short && (
        <p className={ `small w-100 my-2 text-${
          direction === 'next' ? 'right' : 'left'
        } pr-4` }>
          <a href='#' className='text-secondary'
              onClick={ e => {
                evalClick(item.click, props)
                e.stopPropagation()
              } }>
            {
              direction === 'back' && (
                <span className='mr-2'>
                  ⯇</span>
              )
            }
            { evalStatic(item.label, props) }
            {
              direction === 'next' && (
                <span className='mr-2'>
                  ⯈</span>
              )
            }</a></p>
      )
    }
    <button type='button'
        className={ `btn btn-${
          getValidClass(item.valid, props)
        } w-100 my-1 text-uppercase` }
        onClick={ () => evalClick(item.click, props) }
        disabled={ evalStatic(item.disabled, props) }>
      { label || evalStatic(item.label, props) }
    </button>
  </React.Fragment>
)
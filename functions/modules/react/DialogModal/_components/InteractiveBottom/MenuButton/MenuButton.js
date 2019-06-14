import React from 'react'
import getValidClass from '../../../../_helpers/getValidClass/getValidClass'
import evalClick from '../_eval/evalClick'
import evalStatic from '../_eval/evalStatic'

export default ({ item, props }) => (
  <button type='button'
      className={ `btn btn-${
        getValidClass(item.valid, props)
      } col-12 col-lg-8 mx-2 my-1 txt-white py-2 text-uppercase` }
      onClick={ () => evalClick(item.click, props) }
      disabled={ evalStatic(item.disabled, props) }>
    { evalStatic(item.label, props) }
  </button>
)
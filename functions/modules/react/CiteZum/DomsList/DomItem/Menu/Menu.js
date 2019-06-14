import React from 'react'
import MenuButton from '../../../_commons/MenuButton/MenuButton'
import isHidden from '../../../../_helpers/isHidden/isHidden'
import evalStatic from '../_eval/evalStatic/evalStatic'
import evalClick from '../_eval/evalClick/evalClick'

export default props => {
  const lang = window.__PROPS__.lang
  const dom = props.dom
  const baseMenu = dom.menu
  const langMenu = dom[lang].menu
  return baseMenu.order
    .map(key =>
      Object.assign({}, { key }, baseMenu.list[key],
        (langMenu && langMenu[key]) || {}))
    .filter(item => !isHidden(item, props, evalStatic))
    .map(item => (
      <MenuButton key={ `${ props.dom._id }+${ item.key }` }
          item={ item }
          evalStatic={ evalStatic }
          evalClick={ evalClick }
          props={ props }/>))
}
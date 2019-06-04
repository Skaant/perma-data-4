import React from 'react'
import Button from './Button/Button'
import isHidden from '../../../../_helpers/isHidden/isHidden'
import evalStatic from '../_eval/evalStatic'

export default props => {
  const lang = window.__PROPS__.lang
  const event = props.event
  const baseMenu = event.menu
  const langMenu = event[lang].menu
  return baseMenu.order
    .map(key =>
      Object.assign({}, { key }, baseMenu.list[key],
        (langMenu && langMenu[key]) || {}))
    .filter(item => !isHidden(item, props, evalStatic))
    .map(item => (
      <Button key={ `${ props.event._id }+${ item.key }` }
          item={ item }
          props={ props }/>))
}
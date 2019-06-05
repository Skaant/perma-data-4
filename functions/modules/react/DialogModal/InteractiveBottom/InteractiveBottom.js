import React from 'react'
import isHidden from '../../_helpers/isHidden/isHidden'
import MenuButton from './MenuButton/MenuButton'
import DirectionButton from './DirectionButton/DirectionButton'
import evalStatic from './_eval/evalStatic'

export default ({
  dialog, scene,
  menuOptions,
  scope, form,
  translations
}) => {
  const {
    back, back2,
    next, next2,
    menu
  } = scene
  const props = {
    scope, form,
    dialog, scene,
    ...menuOptions
  }
  const hiddenBack = isHidden(back, props, evalStatic)
  const hiddenNext = isHidden(next, props, evalStatic)
  return (
    <React.Fragment>
      {
        menu && (
          <div className='modal-footer container pl-0 py-4'>
            <div className='row w-100 pr-2 pr-3 d-flex justify-content-center'>
              {
                menu.order
                  .map(key => ({
                    key,
                    ...menu.list[key]
                  }))
                  .filter(item => !isHidden(item, props, evalStatic))
                  .map(item => (
                    <MenuButton key={ `${ props.dialog.key }+${ item.key }` }
                        item={ item }
                        props={ props }/>))
              }
            </div>
          </div>
        )
      }
      {
        (!hiddenBack || !hiddenNext) && (
          <div className='modal-footer container pl-0 pb-4 pt-3'>
            <div className='row w-100 pr-3 flex-lg-row-reverse'>
              <div className='col-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-0'>
                {
                  !hiddenNext && (
                    <React.Fragment>
                      <DirectionButton item={ next }
                          props={ props }
                          direction='next'
                          label={ translations.next }/>
                      {
                        !isHidden(next2, props, evalStatic) && (
                          <DirectionButton item={ next2 }
                              props={ props }
                              short={ true }/>)
                      }
                    </React.Fragment>
                  )
                }
              </div>
              <div className='col-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-0'>
                {
                  !hiddenBack && (
                    <React.Fragment>
                      <DirectionButton item={ back }
                          props={ props }
                          direction='back'
                          label={ translations.back }/>
                      {
                        !isHidden(back2, props, evalStatic) && (
                          <DirectionButton item={ back2 }
                              props={ props }
                              short={ true }/>)
                      }
                    </React.Fragment>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </React.Fragment>
  )
}
import React from 'react'
import isHidden from './isHidden/isHidden'
import MenuButton from './MenuButton/MenuButton'
import DirectionButton from './DirectionButton/DirectionButton'

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
  const hiddenBack = isHidden(back, props)
  const hiddenNext = isHidden(next, props)
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
                  .filter(item => !isHidden(item, props))
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
                        !isHidden(next2, props) && (
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
                        !isHidden(back2, props) && (
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
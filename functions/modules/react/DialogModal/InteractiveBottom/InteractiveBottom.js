import React from 'react'
import getValidClass from './getValidClass/getValidClass'

const evalCheck = (code, { scope, form }) => {
  // unused params are meant to be consumed by eval call
  return code && eval(code)
}

const menuClick = (click, { goToScene, setScope, setForm, sendForm, closeForm }) => {
  // unused params are meant to be consumed by eval call
  click && eval(click)
}

export default ({
  dialogId,
  scene,
  menuOptions,
  scope,
  form,
  translations
}) => {
  const { back, next, menu } = scene
  const props = {
    scope,
    form
  }
  const hiddenBack = !back.click || back.hidden && evalCheck(back.hidden, props)
  const hiddenNext = !next.click || next.hidden && evalCheck(next.hidden, props)
  return (
    <React.Fragment>
      {
        menu && (
          <div className='modal-footer container pl-0'>
            <div className='row w-100 pr-2 pr-3 d-flex justify-content-center'>
              {
                menu.order.map(key => ({
                  key,
                  ...menu.list[key]
                }))
                  .filter(item => !!item.click && !item.hidden || !evalCheck(item.hidden, props))
                  .map(item => (
                      <button type='button'
                          key={ `${ dialogId }+${ item.key }` }
                          className={ `btn btn-${
                            getValidClass(item.valid, props)
                          } col-12 col-lg-8 mx-2 my-1 txt-white` }
                          onClick={ () => menuClick(item.click, menuOptions) }
                          disabled={ evalCheck(item.disabled, props) }>
                        { evalCheck(item.label, props) }
                      </button>
                    ))
              }
            </div>
          </div>
        )
      }
      {
        (!hiddenBack || !hiddenNext) && (
          <div className='modal-footer container pl-0'>
            <div className='row w-100 pr-3'>
              <div className='col-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-0'>
                {
                  !hiddenBack && (
                    <button type='button'
                        className={ `btn btn-${
                          getValidClass(back.valid, props)
                        } w-100 my-1` }
                        onClick={ () => menuClick(back.click, menuOptions) }
                        disabled={ evalCheck(back.disabled, props) }>
                      <span className='float-left'>
                        ⯇</span>
                      { evalCheck(back.label, props) }
                    </button>
                  )
                }
              </div>
              <div className='col-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-0'>
                {
                  !hiddenNext && (
                    <button type='button'
                        className={ `btn btn-${
                          getValidClass(next.valid, props)
                        } w-100 my-1` }
                        onClick={ () => menuClick(next.click, menuOptions) }
                        disabled={ evalCheck(next.disabled, props) }>
                      { evalCheck(next.label, props) }
                      <span className='float-right'>
                        ⯈</span>
                    </button>
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
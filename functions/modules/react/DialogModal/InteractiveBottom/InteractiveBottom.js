import React from 'react'
import getValidClass from './getValidClass/getValidClass'

const evalCheck = (code, { scope, form }) => {
  // unused params are meant to be consumed by eval call
  code && eval(code)
}

const menuClick = (click, { back, next, setScope, setForm, sendForm, closeForm, goToScene }) => {
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
  const hiddenBack = !back || evalCheck(back.hidden, props)
  const hiddenNext = !next || evalCheck(next.hidden, props)
  return (
    <React.Fragment>
      {
        menu && (
          <div className='modal-footer container pl-0'>
            <div className='row w-100 pr-2 pr-3 d-flex justify-content-center'>
              {
                menu.order
                  .filter(key =>
                    evalCheck(menu.list[key].hidden, props))
                  .map(key => {
                    const item = menu.list[key]
                    return (
                      <button type='button'
                          key={ `${ dialogId }+${ key }` }
                          className={ `btn btn-${
                            getValidClass(item.valid, props)
                          } col-12 col-md-8 mx-2 my-1 txt-white` }
                          onClick={ () => menuClick(item.click, menuOptions) }
                          disabled={ evalCheck(item.disabled, props) }>
                        { evalCheck(item.label, props) }
                      </button>
                    )
                  })
              }
            </div>
          </div>
        )
      }
      {
        (!hiddenBack || !hiddenNext) && (
          <div className='modal-footer container pl-0'>
            <div className='row w-100 pr-2 pr-3'>
              {
                !hiddenBack && (
                  <button type='button'
                      className={ `btn btn-${
                        getValidClass(back.valid, props)
                      } col-12 col-sm-5 col-md-3 offset-sm-2 offset-md-6 my-1` }
                      onClick={ () => menuClick(back.click, menuOptions) }
                      disabled={ evalCheck(back.disabled, props) }>
                    { evalCheck(back.label, props) }
                  </button>
                )
              }
              {
                !hiddenNext && (
                  <button type='button'
                      className={ `btn btn-${
                        getValidClass(next.valid, props)
                      } col-12 col-sm-5 col-md-3 offset-sm-2 offset-md-6 my-1` }
                      onClick={ () => menuClick(next.click, menuOptions) }
                      disabled={ evalCheck(next.disabled, props) }>
                    { evalCheck(next.label, props) }
                  </button>
                )
              }
            </div>
          </div>
        )
      }
    </React.Fragment>
  )
}
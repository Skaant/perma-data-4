import React from 'react'
import getValidClass from './getValidClass/getValidClass'
import getMainDialogProps from './getMainDialogProps/getMainDialogProps'

const evalCheck = (code, { scope, form, getMainDialogProps }) => {
  // unused params are meant to be consumed by eval call
  return code && eval(code)
}

const menuClick = (click, {
    goToScene,
    scope, setScope,
    form, setForm, sendForm,
    openExtract,
    openDialog, closeDialog }) => {
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
    form,
    getMainDialogProps
  }
  const fullProps = { 
    ...menuOptions,
    ...props
  }
  const hiddenBack = !back || !back.click
    || back.hidden && evalCheck(back.hidden, props)
  const hiddenNext = !next || !next.click
    || next.hidden && evalCheck(next.hidden, props)
  return (
    <React.Fragment>
      {
        menu && (
          <div className='modal-footer container pl-0 py-4'>
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
                          } col-12 col-lg-8 mx-2 my-1 txt-white py-2 text-uppercase` }
                          onClick={ () => menuClick(item.click, fullProps) }
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
          <div className='modal-footer container pl-0 pb-4 pt-3'>
            <div className='row w-100 pr-3 flex-lg-row-reverse'>
              <div className='col-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-0'>
                {
                  !hiddenNext && (
                    <React.Fragment>
                      <p className='small w-100 my-2 text-right pr-4'>
                        <a href='#' className='text-secondary'
                            onClick={ e => {
                              menuClick(next.click, { ...menuOptions, ...props })
                              e.stopPropagation()
                            } }>
                          { evalCheck(next.label, props) }
                          <span className='mr-2'>
                            ⯈</span></a></p>
                      <button type='button'
                          className={ `btn btn-${
                            getValidClass(next.valid, props)
                          } w-100 my-1 text-uppercase` }
                          onClick={ () => menuClick(next.click, fullProps) }
                          disabled={ evalCheck(next.disabled, props) }>
                        { translations.next }
                      </button>
                    </React.Fragment>
                  )
                }
              </div>
              <div className='col-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-0'>
                {
                  !hiddenBack && (
                    <React.Fragment>
                      <p className='small text-secondary w-100 text-left my-2 pl-4'>
                        <a href='#' className='text-secondary'
                            onClick={ e => {
                              menuClick(back.click, { ...menuOptions, ...props })
                              e.stopPropagation()
                            } }>
                          <span className='mr-2'>
                            ⯇</span>
                          { evalCheck(back.label, props) }</a></p>
                      <button type='button'
                          className={ `btn btn-${
                            getValidClass(back.valid, props)
                          } w-100 my-1 text-uppercase` }
                          onClick={ () => menuClick(back.click, { ...menuOptions, ...props }) }
                          disabled={ evalCheck(back.disabled, props) }>
                        { translations.back }
                      </button>
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
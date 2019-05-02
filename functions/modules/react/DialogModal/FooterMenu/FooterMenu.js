import React from 'react'
import checkDisabledNext from './checkDisabledNext/checkDisabledNext'

const menuClick = (transition, setForm, sendForm, goTo) => {
  // unused params are meant to be consumed by eval call
  transition.click && eval(transition.click)
  goTo(transition.scene)
}

export default ({ 
  scene,
  back, next, goTo,
  form, setForm, sendForm,
  translations
}) => (
  <React.Fragment>
    {
      scene.menu && (
        <div className='modal-footer container pl-0'>
          <div className='row w-100 pr-2 pr-3 d-flex justify-content-center'>
            {
              scene.menu.map((item, index) => (
                <button key={ item.label } type='button'
                    className='btn btn-warning col-12 col-md-8 mx-2 my-1 txt-white'
                    onClick={ () => menuClick(scene.menu[index].transition, setForm, sendForm, goTo) }>
                  { item.label }
                </button>
              ))
            }
          </div>
        </div>
      )
    }
    <div className='modal-footer container pl-0'>
      <div className='row w-100 pr-2 pr-3'>
        <button type='button' className='btn btn-secondary col-12 col-sm-5 col-md-3 my-1'
            onClick={ () => back(scene.backIndex) }>
          { translations.back }
        </button>
        {
          !checkDisabledNext(scene.disabledNext, form) && (
            <button type='button'className='btn btn-info col-12 col-sm-5 col-md-3 offset-sm-2 offset-md-6 my-1'
                onClick={ () => next(scene.nextIndex) }>
              { translations.next }
            </button>
          )
        }
      </div>
    </div>
  </React.Fragment>
)
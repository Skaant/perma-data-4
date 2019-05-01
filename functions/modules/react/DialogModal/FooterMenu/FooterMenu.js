import React from 'react'
import checkDisabledNext from './checkDisabledNext/checkDisabledNext'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {}
    }
  }

  setForm(key, value) {
    const { form } = this.state
    this.setState({
      form: Object.assign({}, form, {
        [key]: value
      })
    })
  }

  menuClick(index) {
    const { 
      scene,
      goTo
    } = this.props
    const setForm = this.setForm.bind(this)
    scene.menu[index].transition.click && eval(scene.menu[index].transition.click)
    goTo(scene.menu[index].transition.scene)
  }

  render() {
    const { 
      scene,
      back, next,
      translations
    } = this.props
    const { form } = this.state
    return (
      <React.Fragment>
        {
          scene.menu && (
            <div className='modal-footer container pl-0'>
              <div className='row w-100 pr-2 pr-3 d-flex justify-content-center'>
                {
                  scene.menu.map((item, index) => (
                    <button key={ item.label } type='button'
                        className='btn btn-warning col-12 col-sm-6 col-lg-3 mx-2 my-1 txt-white'
                        onClick={ () => this.menuClick(index) }>
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
                onClick={ () => back() }>
              { translations.back }
            </button>
            {
              !checkDisabledNext(scene.disabledNext, form) && (
                <button type='button'className='btn btn-info col-12 col-sm-5 col-md-3 offset-sm-2 offset-md-6 my-1'
                    onClick={ () => next() }>
                  { translations.next }
                </button>
              )
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}
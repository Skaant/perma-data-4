import React from 'react'
import FooterMenu from './FooterMenu/FooterMenu'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      prevDialog: props.dialog._id,
      form: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.dialog._id != prevProps.dialog._id) {
      this.setState({
        current: 0,
        prevDialog: this.props.dialog._id
      })
    }
  }

  backScene(index) {
    const { current } = this.state
    if (index && index >= 0) {
      this.setState({
        current: index
      })
    } else if (current - 1 >= 0) {
      this.setState({
        current: current - 1
      })
    }
  }

  nextScene(index) {
    const { dialog } = this.props
    const { current } = this.state
    if (index && index < dialog.scenes.length) {
      this.setState({
        current: index
      })
    } else if (current + 1 < dialog.scenes.length) {
      this.setState({
        current: current + 1
      })
    }
  }

  goToScene(index) {
    const { dialog } = this.props
    if (index >= 0 && index < dialog.scenes.length) {
      this.setState({
        current: index
      })
    }
  }

  setForm(key, value) {
    const { form } = this.state
    this.setState({
      form: { 
        ...form,
        [key]: value
      }
    })
  }

  sendForm(key) {
    const { uid, lang, updateUser } = this.props
    const { form } = this.state
    fetch('/api/dialog', {
      method: 'POST',
      body: JSON.stringify({
        key,
        lang,
        uid,
        form
      })
    })
      .then(result => result.json())
      .then(result => updateUser(result))
        .catch(err => console.log(err) 
        // TODO do something with error
      )
  }

  render() {
    const { dialog, translations, closeForm } = this.props
    const { current, prevDialog, form } = this.state
    const scene = (prevDialog && prevDialog === dialog._id) ? dialog.scenes[current] : dialog.scenes[0]
    return (
      <div id='dialog-modal' className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header alert-dark'>
            <h5 className='modal-title text-uppercase text-dark'>{ scene.title || 'Dialog' }</h5>
            <button type='button' className='close'
                data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>
                &times;</span></button>
          </div>
          <div className='modal-body container py-0'>
            <div className='row'>
              {
                scene.img && (
                  <img src={ scene.img }/>
                )
              }
            </div>
            <div className='row p-4'>
              {
                scene.content.map((p, index) => (
                  <p key={ `${ current }x${ index }` }>
                    { p }</p>
                ))
              }
            </div>
          </div>
          <FooterMenu scene={ scene }
              back={ this.backScene.bind(this) }
              next={ this.nextScene.bind(this) }
              goTo={ this.goToScene.bind(this) }
              form={ form }
              setForm={ this.setForm.bind(this) }
              sendForm={ this.sendForm.bind(this) }
              closeForm={ closeForm }
              translations={ translations }/>
        </div>
      </div>
    )
  }
}
import React from 'react'
import InteractiveBottom from './InteractiveBottom/InteractiveBottom'
import ModalTitle from './ModalTitle/ModalTitle';
import ModalBody from './ModalBody/ModalBody';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.dialog.scenes.first,
      prevDialog: props.dialog._id,
      form: {},
      scope: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.dialog._id != prevProps.dialog._id) {
      this.setState({
        current: this.props.dialog.scenes.first,
        prevDialog: this.props.dialog._id,
        form: {},
        scope: {}
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

  goToScene(value) {
    const { dialog } = this.props
    const index = (typeof value === 'number') ? value
      : dialog.scenes.order.indexOf(value)
    if (index >= 0 && index < dialog.scenes.length) {
      this.setState({
        current: index
      })
    } else { 
      // TODO 
    }
  }

  setScope(key, value) {
    const { scope } = this.state
    this.setState({
      scope: { 
        ...scope,
        [key]: value
      }
    })
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
    const { dialog, translations, closeForm, lang } = this.props
    const { current, prevDialog, scope, form } = this.state

    if (prevDialog && prevDialog === dialog._id) {
      const baseScene = dialog.scenes.list[current]
      const langScene = dialog[lang].scenes && dialog[lang].scenes[current] || false
      const scene = langScene ? Object.assign({}, baseScene, langScene, {
        menu: Object.assign({}, baseScene.menu, langScene.menu),
        back: Object.assign({}, baseScene.back, langScene.back),
        next: Object.assign({}, baseScene.next, langScene.next)
      }) : baseScene
  
      return (
        <div id='dialog-modal' className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header alert-dark'>
              <ModalTitle title={ dialog[lang].dialog.title }
                  current={ current }
                  pages={ dialog.scenes.pages } />
              <button type='button' className='close'
                  data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>
                  &times;</span></button>
            </div>
            <ModalBody scene={ scene } extracts={ dialog.extracts } />
            <InteractiveBottom dialogId={ dialog._id }
                scene={ scene }
                menuOptions={ {
                  back: this.backScene.bind(this),
                  next: this.nextScene.bind(this),
                  goToScene: this.goToScene.bind(this),
                  setScope: this.setScope.bind(this),
                  setForm: this.setForm.bind(this),
                  sendForm: this.sendForm.bind(this),
                  closeForm: closeForm
                } }
                scope={ scope }
                form={ form }
                translations={ translations }/>
          </div>
        </div>
      )
    } else {
      // invisible
      return (
        <h3>Dialog has changed. Please, wait.</h3>
      )
    }
  }
}
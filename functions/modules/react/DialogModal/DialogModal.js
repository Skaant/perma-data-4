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

  goToScene(value) {
    this.setState({
      current: value
    })
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
      const scene = langScene ?  { ...baseScene, ...langScene, ...{
        menu: {
          order: baseScene.menu.order,
          list: Object.keys(baseScene.menu.list)
            .map(key => ({
              key,
              ...baseScene.menu.list[key],
              ...langScene.menu[key]
              }))
            .reduce((list, { key, ...item }) => {
              list[key] = item
              return list
            }, {})
        },
        back: { ...baseScene.back, ...langScene.back },
        next: { ...baseScene.next, ...langScene.next }
      }} : baseScene
  
      return (
        <div id='dialog-modal' className='modal-dialog modal-lg' role='document'>
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
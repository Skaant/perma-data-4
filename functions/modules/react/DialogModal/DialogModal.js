import React from 'react'
import InteractiveBottom from './InteractiveBottom/InteractiveBottom'
import ModalTitle from './ModalTitle/ModalTitle'
import ModalBody from './ModalBody/ModalBody'
import _staticStyle from './_staticStyle/_staticStyle'
import mergeSceneSource from './mergeSceneSource/mergeSceneSource'

export default class extends React.Component {
  constructor(props) {
    super(props)
    const { _id, scenes, initScope } = props.dialog
    window.__STATE__.dialogs = [{
      _id,
      current: scenes.first
    }]
    this.state = {
      current: scenes.first,
      form: {},
      scope: initScope || {}
    }
  }

  componentDidUpdate() {
    const { dialog, current } = this.props
    const { _id, scenes, initScope } = dialog
    if (_id != window.__STATE__.dialogs[0]._id) {

      window.__STATE__.dialogs.unshift({
        _id,
        current: current || scenes.first
      })
      this.setState({
        current: current || scenes.first,
        form: {},
        scope: initScope || {}
      })
    }
  }

  goToScene(value) {
    window.__STATE__.dialogs[0].current = value
    this.setState({
      current: value
    })
    setTimeout(() => $('#anchor-dialog').modal().scrollTop(0), 15);
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
    if (confirm(this.props.translations.confirmSend)) {
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
  }

  render() {
    const {
      dialog,
      openExtract,
      openDialog, closeDialog,
      lang, translations
    } = this.props
    const { current, scope, form } = this.state

    if (window.__STATE__.dialogs[0]._id === dialog._id) {
      const baseScene = dialog.scenes.list[current]
      const langScene = dialog[lang].scenes && dialog[lang].scenes[current] || false
      const scene = mergeSceneSource(baseScene, langScene)
  
      // _staticStyle  - used here for the multiple ContentDisplay instanciation occuring inside
      //    (increases re-render level and reduces its frequency)
      return (
        <div id='dialog-modal' className='modal-dialog modal-lg' role='document'>
          <div className='modal-content'>
            <style>{ _staticStyle }</style>
            <div className='modal-header alert-dark'>
              <ModalTitle scene={ scene }
                  title={ dialog[lang].dialog.title }
                  current={ current }
                  pages={ dialog.scenes.pages } />
              <button type='button' className='close'
                  data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>
                  &times;</span></button>
            </div>
            <ModalBody scene={ scene }
                lang={ lang }
                translations={ translations }/>
            <InteractiveBottom dialogId={ dialog._id }
                scene={ scene }
                menuOptions={ {
                  goToScene: this.goToScene.bind(this),
                  setScope: this.setScope.bind(this),
                  setForm: this.setForm.bind(this),
                  sendForm: this.sendForm.bind(this),
                  openExtract: openExtract,
                  openDialog: openDialog,
                  closeDialog: closeDialog
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
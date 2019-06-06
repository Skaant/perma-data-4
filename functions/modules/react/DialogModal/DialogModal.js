import React from 'react'
import InteractiveBottom from './InteractiveBottom/InteractiveBottom'
import ModalTitle from './ModalTitle/ModalTitle'
import ModalBody from './ModalBody/ModalBody'
import _staticStyle from './_staticStyle/_staticStyle'
import mergeSceneSource from './mergeSceneSource/mergeSceneSource'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.initialState
  }

  componentDidUpdate() {
    const { initialState } = this.props
    const { uid, key } = this.state

    // user changed or dialog changed
    if (initialState.uid !== uid || initialState.key !== key) {
      this.setState(initialState)
      const { lang, dialog } = this.props
      if (dialog.provision) {
        fetch(`/api/dialog/provision?key=${ dialog.provision }&uid=${
            initialState.uid }&lang=${ lang }`)
          .then(result => result.json())
          .then(result => console.log(result))
          .catch(err => console.error(err) 
            // TODO do something with error
          )
      }
    }
  }

  goToScene(value) {
    window.__STATE__.dialogs.list[
      window.__STATE__.dialogs.history[0]].sceneKey = value
    this.setState({
      sceneKey: value
    })
    setTimeout(() => $('#anchor-dialog').modal().scrollTop(0), 15);
  }

  setScope(key, value) {
    const { scope } = this.state
    const newScope = { 
      ...scope,
      [key]: value
    }
    window.__STATE__.dialogs.list[
      window.__STATE__.dialogs.history[0]].scope = newScope
    this.setState({
      scope: newScope
    })
  }

  setForm(key, value) {
    const { form } = this.state
    const newForm = { 
      ...form,
      [key]: value
    }
    window.__STATE__.dialogs.list[
      window.__STATE__.dialogs.history[0]].form = newForm
    this.setState({
      form: newForm
    })
  }

  sendForm(key, directForm) {
    if (confirm(this.props.translations.confirmSend)) {
      const { lang } = this.props
      const { uid, form } = this.state
      fetch('/api/dialog', {
        method: 'POST',
        body: JSON.stringify({
          key,
          lang,
          uid,
          form: directForm || form
        })
      })
        .then(result => result.json())
        .then(result => window.__METHODS__.updateUser(result))
        .catch(err => console.error(err) 
          // TODO do something with error
        )
    }
  }

  render() {
    const {
      dialog,
      initialState,
      lang, translations
    } = this.props
    const { 
      uid, key,
      sceneKey,
      scope, form
    } = this.state

    if (initialState.uid === uid && initialState.key === key) {
      const baseScene = dialog.scenes.list[sceneKey]
      const langScene = dialog[lang].scenes && dialog[lang].scenes[sceneKey] || false
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
                  sceneKey={ sceneKey }
                  pages={ dialog.scenes.pages } />
              <button type='button' className='close'
                  data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>
                  &times;</span></button>
            </div>
            <ModalBody scene={ scene }
                lang={ lang }
                translations={ translations }/>
            <InteractiveBottom dialog={ dialog }
                scene={ scene }
                menuOptions={ {
                  goToScene: this.goToScene.bind(this),
                  setScope: this.setScope.bind(this),
                  setForm: this.setForm.bind(this),
                  sendForm: this.sendForm.bind(this)
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
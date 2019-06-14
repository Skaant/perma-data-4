import React from 'react'
import InteractiveBottom from './_components/InteractiveBottom/InteractiveBottom'
import ModalTitle from './_components/ModalTitle/ModalTitle'
import ModalBody from './_components/ModalBody/ModalBody'
import _staticStyle from './_staticStyle/_staticStyle'
import mergeSceneSource from './_helpers/mergeSceneSource/mergeSceneSource'

export default class extends React.Component {
  constructor(props) {
    super(props)
    const { dialog, initialState } = props
    this.state = initialState
    this.provisionDialog = this._provisionDialog.bind(this)
    
    if (dialog.provision) {
      const { lang } = props
      this.provisionDialog(dialog.provision, initialState.uid, lang)
    }
  }

  componentDidUpdate() {
    const { initialState } = this.props
    const { uid, key } = this.state

    // user changed or dialog changed
    if (initialState.uid !== uid || initialState.key !== key) {
      this.setState(initialState)
      const { lang, dialog } = this.props
      const { fetching, provisioned } = this.state

      if (dialog.provision && !provisioned && !fetching) {
        this.provisionDialog(dialog.provision, initialState.uid, lang)
      }
    }
  }

  _provisionDialog(provisionKey, uid, lang) {
    // dialog.key != (provision: key)
    const { key } = this.props.initialState
    window.__STATE__.dialogs.list[key].provisioned = true
    this.setState({
      fetching: true 
    })

    fetch(`/api/dialog/provision?key=${ provisionKey }&uid=${ uid }&lang=${ lang }`)
      .then(result => result.json())
      .then(({ userData, dialogData }) => {
        if (dialogData) {
          window.__STATE__.dialogs.list[key].data = dialogData
        }
        if (userData) {
          window.__METHODS__.updateUser(userData)
        }
        this.setState({
          data: dialogData || false,
          fetching: false
        })
      })
      .catch(err => console.error(err))    
  }

  goToScene(value) {
    window.__STATE__.dialogs.list[
      window.__STATE__.dialogs.history[0]].sceneKey = value
    this.setState({
      sceneKey: value
    })
    setTimeout(() => $('#anchor-dialog').modal().scrollTop(0), 30)
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
      scope, form,
      data
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
                translations={ translations }
                data={ data }
                dialogKey={ key }/>
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
                data={ data }
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
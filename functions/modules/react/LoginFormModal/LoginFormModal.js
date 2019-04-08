import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import ContentForm from './ContentForm/ContentForm'
import FooterMenu from './FooterMenu/FooterMenu'

const modeToTranslationKey = mode => {
  switch (mode) {
    case 'sign-in':
      return 'signIn'
    case 'sign-up':
      return 'signUp'
    case 'reset':
      return 'resetPassword'
  }
}

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'sign-in',
      form: {
        email: '',
        pseudo: '',
        password: ''
      },
      info: null
    }
  }

  handleFormChange(key, value) {
    const { form } = this.state
    this.setState({
      form: Object.assign({}, form, {
        [key]: value
      }),
      info: null
    })
  }

  switchMode(mode) {
    this.setState({
      mode,
      info: null
    })
  }

  signIn() {
    const { email, password } = this.state
    if (!email || !password) {
      this.setState({
        info: 'Missing field'
      })
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => this.setState({ info: 'Logged in' }))
        .catch(err => this.setState({ info: err.message }))
    }
  }

  signUp() {
    const { email, pseudo, password } = this.state
    if (!email || !pseudo || !password) {
      this.setState({
        info: 'Missing field'
      })
    } else {
      fetch('/api/user/temp', {
        method: 'PUT',
        body: JSON.stringify({
          email,
          pseudo
        })
      })
      .then(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => this.setState({
            info: 'User created'
          }))
          .catch(err => this.setState({
            info: err.message
          }))
      })
      .catch(err => this.setState({
        info: err.message
      }))
    }
  }

  resetPassword() {
    const { email } = this.state
    if (!email) {
      this.setState({
        info: 'Missing field'
      })
    } else {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => this.setState({
          info: 'The password recovery mail has been sent'
        }))
        .catch(err => this.setState({
          info: err.message
        }))
    }
  }

  render() {
    const { translations } = this.props
    const { mode, form, info } = this.state
    const options = {
      signIn: this.signIn.bind(this),
      signUp: this.signUp.bind(this),
      resetPassword: this.resetPassword.bind(this)
    }
    return (
      <div id='login-form' className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header bg-warning alert-warning'>
            <h5 className='modal-title text-uppercase'>🐛{ translations.title } 🧘‍🦓🌻</h5>
            <button type='button' className='close'
                data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>
                &times;</span></button>
          </div>
          <div className='modal-body container p-4'>
            <div className='row'>
              <p className='h6 w-100 text-center m-4'>
                { translations[modeToTranslationKey(mode)] } :</p></div>
            <ContentForm mode={ mode }
                form={ form }
                changeValue={ this.handleFormChange.bind(this) }
                options={ options }
                translations={ translations } />
            {
              info && (
                <div className='row alert alert-warning mx-4 mt-4'>
                  { info }</div>
              )
            }
          </div>
          <div className='modal-footer container px-4 py-3'>
            <FooterMenu mode={ mode } form={ form }
                switchMode={ this.switchMode.bind(this) }
                options={ options }
                translations={ translations }/>
          </div>
        </div>
      </div>
    )
  }
}
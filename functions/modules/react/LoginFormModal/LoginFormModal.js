import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

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
      email: '',
      pseudo: '',
      password: '',
      mode: 'sign-in',
      info: null
    }
  }

  handleFormChange(key, value) {
    this.setState({
      [key]: value,
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
    const { mode, email, pseudo, password, info } = this.state
    return (
      <div id='login-form' className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              { translations[modeToTranslationKey(mode)] }</h5>
            <button type='button' className='close'
                data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>
                &times;</span></button>
          </div>
          <div className='modal-body container p-4'>
            <div className='row'>
            </div>
            <div className='row'>
              <input type='email' className='form-control col-8 offset-2 my-2' value={ email }
                  placeholder='email'
                  onChange={ e => this.handleFormChange('email', e.target.value) }
                  onKeyPress={ e => (mode === 'reset' && email
                    && e.charCode === 13) &&  this.resetPassword() }/>
            </div>
            {
              mode === 'sign-up' && (
                <div className='row'>  
                  <input type='text' className='form-control col-8 offset-2 my-2' value={ pseudo }
                      placeholder='pseudo'
                      onChange={ e => this.handleFormChange('pseudo', e.target.value) }/>
                </div>
              )
            }
            { 
              (mode === 'sign-up' || mode === 'sign-in') && (
                <div className='row'>
                  <input type='password' className='form-control col-8 offset-2 my-2' value={ password }
                      placeholder='password'
                      onChange={ e => this.handleFormChange('password', e.target.value) }
                      onKeyPress={ e => e.charCode === 13 && email && password
                        && (mode === 'sign-in' && this.signIn()
                          || pseudo && mode === 'sign-up' && this.signUp()) }/>
                </div>
              )
              
            }
            {
              info && (
                <div className='row alert alert-warning mx-4 mt-4'>
                  { info }</div>
              )
            }
          </div>
          <div className='modal-footer'>
            {
              mode === 'reset' && (
                <React.Fragment>
                  <button type='button'
                      className='btn btn-secondary'
                      onClick={ () => this.switchMode('sign-up') }>
                    { translations.signUp }</button>
                  <button type='button'
                      className='btn btn-secondary'
                      onClick={ () => this.switchMode('sign-in') }>
                    { translations.signIn }</button>
                  <button type='button'
                      className='btn btn-primary'
                      onClick={ () => this.resetPassword() }
                      disabled={ email === '' }>
                    { translations.send }</button>
                </React.Fragment>
              )
            }
            { 
              mode === 'sign-up' && (
                <React.Fragment>
                  <button type='button'
                      className='btn btn-secondary'
                      onClick={ () => this.switchMode('reset') }>
                    { translations.resetPassword }</button>
                  <button type='button'
                      className='btn btn-secondary'
                      onClick={ () => this.switchMode('sign-in') }>
                    { translations.signIn }</button>
                  <button type='button'
                      className='btn btn-primary'
                      onClick={ () => this.signUp() }
                      disabled={ !email || !pseudo || !password }>
                    { translations.send }</button>
                </React.Fragment>
              )
            } 
            { 
              mode === 'sign-in' && (
                <React.Fragment>
                  <button type='button'
                      className='btn btn-secondary'
                      onClick={ () => this.switchMode('reset') }>
                    { translations.resetPassword }</button>
                  <button type='button'
                      className='btn btn-secondary'
                      onClick={ () => this.switchMode('sign-up') }>
                    { translations.signUp }</button>
                  <button type='button'
                      className='btn btn-primary'
                      onClick={ () => this.signIn() }
                      disabled={ !email || !password }>
                    { translations.send }</button>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
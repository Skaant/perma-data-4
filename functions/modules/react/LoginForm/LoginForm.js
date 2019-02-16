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

  signIn() {
    const { email, pseudo, password } = this.state
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
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => this.setState({ info: 'User created' }))
        .catch(err => this.setState({
          info: err.message
        }))
    }
  }

  switchToSignIn() {
    this.setState({
      mode: 'sign-in'
    })
  }

  switchToSignUp() {
    this.setState({
      mode: 'sign-up'
    })
  }

  switchToResetPassword() {
    this.setState({ 
      mode: 'reset'
    })
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
      <React.Fragment>
        <div className='modal-body container p-4'>
          <div className='row'>
            <h5 className='col-12 text-center my-4'>
              { translations[modeToTranslationKey(mode)] }</h5>
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
                    onKeyPress={ e => email && password
                      && e.charCode === 13 && this.signIn() }/>
              </div>
            )
            
          }
          {
            info && (
              <div className='row alert alert-warning'>
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
                    onClick={ () => this.switchToSignUp() }>
                  { translations.signUp }</button>
                <button type='button'
                    className='btn btn-secondary'
                    onClick={ () => this.switchToSignIn() }>
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
                    onClick={ () => this.switchToResetPassword() }>
                  { translations.resetPassword }</button>
                <button type='button'
                    className='btn btn-secondary'
                    onClick={ () => this.switchToSignIn() }>
                  { translations.signIn }</button>
                <button type='button'
                    className='btn btn-primary'
                    onClick={ () => this.signIn() }
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
                    onClick={ () => this.switchToResetPassword() }>
                  { translations.resetPassword }</button>
                <button type='button'
                    className='btn btn-secondary'
                    onClick={ () => this.switchToSignUp() }>
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
      </React.Fragment>
    )
  }
}
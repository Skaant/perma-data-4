import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      pseudo: '',
      password: '',
      mode: 'login',
      info: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.updateUser(user)
    })
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

  switchToLogin() {
    this.setState({
      mode: 'login'
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
    const { mode, email, pseudo, password, info } = this.state
    return (
      <React.Fragment>
        <div className='modal-body container p-4'>
          <div className='row'>
            <input type='email' className='form-control col-8 offset-2 my-2' value={ email }
                placeholder='email'
                onChange={ e => this.handleFormChange('email', e.target.value) }
                onKeyPress={ e => (mode !== 'login' && email
                  && e.charCode === 13) &&  this.resetPassword() }/>
          </div>
          {
            mode === 'login' && (
              <React.Fragment>
                <div className='row'>  
                  <input type='text' className='form-control col-8 offset-2 my-2' value={ pseudo }
                      placeholder='pseudo'
                      onChange={ e => this.handleFormChange('pseudo', e.target.value) }/>
                </div>
                <div className='row'>
                  <input type='password' className='form-control col-8 offset-2 my-2' value={ password }
                      placeholder='password'
                      onChange={ e => this.handleFormChange('password', e.target.value) }
                      onKeyPress={ e => email && password
                        && e.charCode === 13 && this.signIn() }/>
                </div>
              </React.Fragment>
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
            mode == 'login' ? (
              <React.Fragment>
                <button type='button'
                    className='btn btn-secondary'
                    onClick={ () => this.switchToResetPassword() }>
                  reset password</button>
                <button type='button'
                    className='btn btn-secondary'
                    onClick={ () => this.signUp() }
                    disabled={ email === '' || pseudo === '' || password === '' }>
                  sign up</button>
                <button type='button'
                    className='btn btn-primary'
                    onClick={ () => this.signIn() }
                    disabled={ email === '' || password === '' }>
                  sign in</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button type='button'
                    className='btn btn-secondary'
                    onClick={ () => this.switchToLogin() }>
                  back to login</button>
                <button type='button'
                    className='btn btn-primary'
                    onClick={ () => this.resetPassword() }
                    disabled={ email === '' }>
                  send recovery</button>
              </React.Fragment>
            )
          }
        </div>
      </React.Fragment>
    )
  }
}
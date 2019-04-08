import React from 'react'

const checkDisabled = (mode, { email, pseudo, password }) => {
  switch(mode) {
    case 'sign-in':
      return !email || !password
    case 'sign-up':
      return !email || !pseudo || !password
    case 'reset':
      return !email
  }
}

const handleSend = (mode, options) => {
  switch(mode) {
    case 'sign-in':
      options.signIn()
    case 'sign-up':
      options.signUp()
    case 'reset':
      options.resetPassword()
  }
}

export default ({
  mode,
  form, // email, pseudo, password
  switchMode,
  options, // signIn, signUp, resetPassword
  translations
}) => (
  <div className='row flex-row-reverse'>
    <div className='col-12 col-md-6 py-1'>
      <button type='button'
          className='btn btn-warning py-2 w-100 h-100 text-uppercase'
          onClick={ () => handleSend(mode, options) }
          disabled={ checkDisabled(mode, form) }>
        🌿 { translations.send } 🕊🌛</button>
    </div>
    <div className='col-12 col-sm-6'>
      {
        mode !== 'reset' && (
          <button type='button'
              className='btn btn-secondary my-1 py-2 w-100 text-uppercase'
              onClick={ () => switchMode('reset') }>
            🤷🏼‍🙊 { translations.resetPassword }</button>
        )
      }
      {
        mode !== 'sign-up' && (
          <button type='button'
              className='btn btn-info my-1 py-2 w-100 text-uppercase'
              onClick={ () => switchMode('sign-up') }>
            🙌🏽 { translations.signUp }</button>
        )
      }
      {
        mode !== 'sign-in' && (
          <button type='button'
              className='btn btn-success my-1 py-2 w-100 text-uppercase'
              onClick={ () => switchMode('sign-in') }>
            🔥🐲 { translations.signIn }</button>
        )
      }
    </div>
  </div>
)
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
  <div className='modal-footer flex-column flex-sm-row'>
    {
      mode !== 'reset' && (
        <button type='button mt-2 col-12 col-sm-4 py-2 text-uppercase'
            className='btn btn-secondary'
            onClick={ () => switchMode('reset') }>
          🤷🏼‍🙊 { translations.resetPassword }</button>
      )
    }
    {
      mode !== 'sign-up' && (
        <button type='button mt-2 col-12 col-sm-4 py-2 text-uppercase'
            className='btn btn-info'
            onClick={ () => switchMode('sign-up') }>
          🙌🏽 { translations.signUp }</button>
      )
    }
    {
      mode !== 'sign-in' && (
        <button type='button mt-2 col-12 col-sm-4 py-2 text-uppercase'
            className='btn btn-success'
            onClick={ () => switchMode('sign-in') }>
          🔥🐲 { translations.signIn }</button>
      )
    }
    <button type='button'
        className='btn btn-warning col-12 col-sm-4 py-2 text-uppercase'
        onClick={ () => handleSend(mode, options) }
        disabled={ checkDisabled(mode, form) }>
      🌿 { translations.send } 🕊🌛</button>
  </div>
)
import React from 'react'

export default ({
  mode,
  form: { email, pseudo, password },
  changeValue,
  options,
  translations
}) => (
  <React.Fragment>
    <div className='row'>
      <input type='email' className='form-control col-8 offset-2 my-2' value={ email }
          placeholder={ translations.email }
          onChange={ e => changeValue('email', e.target.value) }
          onKeyPress={ e => (mode === 'reset' && email
            && e.charCode === 13) && options.resetPassword() }/>
    </div>
    {
      mode === 'sign-up' && (
        <div className='row'>  
          <input type='text' className='form-control col-8 offset-2 my-2' value={ pseudo }
              placeholder={ translations.pseudo }
              onChange={ e => changeValue('pseudo', e.target.value) }/>
        </div>
      )
    }
    { 
      (mode === 'sign-up' || mode === 'sign-in') && (
        <div className='row'>
          <input type='password' className='form-control col-8 offset-2 my-2' value={ password }
              placeholder={ translations.password }
              onChange={ e => changeValue('password', e.target.value) }
              onKeyPress={ e => e.charCode === 13 && email && password
                && (mode === 'sign-in' && options.signIn()
                  || pseudo && mode === 'sign-up' && options.signUp()) }/>
        </div>
      )
    }
  </React.Fragment>
)
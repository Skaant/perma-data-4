import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  openDialog() {
    window.__METHODS__.openDialog('main')
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => this.setState({
        info: 'You are now disconnected'
      }))
  }

  render() {
    const {
      user : {
        email,
        data: {
          pseudo
        }},
      translations
    } = this.props
    return (
      <div className='btn-group'>
        <button type='button' className='btn btn-light py-2 px-3'
            disabled={ true }>
          <b>{ pseudo || email }</b></button>
        <button type='button' className='btn btn-light px-3 text-uppercase'
            title={ translations.openDialog }
            onClick={ this.openDialog }>
          { translations.dialog }</button>
        <button type='button' className='btn btn-danger' aria-label='Close'
            title={ translations.disconnect }
            onClick={ () => this.signOut() }>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    )
  }
}
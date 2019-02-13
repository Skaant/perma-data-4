import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => this.setState({
        info: 'You are now disconnected'
      }))
  }

  render() {
    return (
      <div>
        <b className='mb-0'>
          { this.props.user.email }</b>
        <button type='button' className='close ml-4' aria-label='Close'
          onClick={ () => this.signOut() }>
        <span aria-hidden='true'>&times;</span>
      </button>
      </div>
    )
  }
}
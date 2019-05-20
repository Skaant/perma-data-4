import firebase from 'firebase/app'
import 'firebase/auth'

export default (err, type, isUser) => {
  $('#launch-info').addClass('d-none')

  $('#error-modal__label, #error-info__status')
    .html(window.__loadingTexts__[type])
  $('#error-modal__title')
    .html(err.title || err.name)
  $('#error-modal__description')
    .html(err.message)
  
  // KEEP THIS volountary console.log
  console.log(err)
  
  $('#error-button')
    .click(() => $('#error-modal').modal('show'))

  if (isUser) {
    $('#error-info__buttons')
      .append(`
        <button id='user-error-button' type='button' 
            class='btn btn-danger' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>`)
    $('#user-error-button')
      .click(() => firebase.auth().signOut()
        .then(() => {
          $('#error-info').addClass('d-none')
          $('#user-error-button').remove()
        }))
  }

  $('#error-info').removeClass('d-none')
  $('#error-modal').modal('show')
}
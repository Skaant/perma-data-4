export default () => {
  $('#home-login-button')
    .click(() => $('#anchor-login-form').modal('show'))

  $('#home-authentication-loading').addClass('d-none')
  $('#home-login-button__container').removeClass('d-none')
}
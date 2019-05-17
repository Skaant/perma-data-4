export default () => {
  $('#home-login-button')
    .click(() => $('#anchor-login-form').modal('toggle'))
  $('#home-login-button__container').removeClass('d-none')
  $('#home-authentication-loading').addClass('d-none')
}
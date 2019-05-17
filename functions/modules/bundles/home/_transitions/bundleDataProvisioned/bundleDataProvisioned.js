export default () => {
  $('#home-login-button')
    .click(() => $('#anchor-login-form').modal('toggle'))
  $('#home-authentication-loading, #unauth-home').addClass('d-none')
  $('#home-login-button__container, #anchor-user-home').removeClass('d-none')
}
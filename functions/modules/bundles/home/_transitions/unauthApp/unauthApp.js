export default () => {
  $('#home-login-button')
    .click(() => $('#anchor-login-form').modal('toggle'))
  $('#home-authentication-loading, #anchor-user-home').addClass('d-none')
  $('#home-login-button__container, #unauth-home').removeClass('d-none')
}
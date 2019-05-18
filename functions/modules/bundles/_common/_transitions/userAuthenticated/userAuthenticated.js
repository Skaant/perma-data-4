export default () => {
  if (window.__STATE__.bundle) {
    $('#launch-info__status')
      .html(window.__loadingTexts__['user authenticated'])
  }
  $('#search-plant-button')
    .addClass('btn-warning')
    .removeClass('btn-light')
  $('#launch-info').removeClass('d-none')
  $('#login-button-container').addClass('d-none')
  $('#anchor-login-form').modal('hide')
}
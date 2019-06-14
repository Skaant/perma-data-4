export default () => {
  window.__METHODS__.updateUser()
  window.__METHODS__.openDialog('main')
  $('#anchor-user-panel').removeClass('d-none')
  $('#launch-info').addClass('d-none')
}
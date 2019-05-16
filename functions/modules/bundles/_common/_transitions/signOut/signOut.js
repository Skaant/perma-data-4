export default specific => {
  specific && specific()

  Array.from(document.getElementsByClassName('auth-none'))
    .forEach(element => $(element).removeClass('d-none'))
  Array.from(document.getElementsByClassName('data-loading'))
    .forEach(element => $(element).addClass('d-none'))
  Array.from(document.getElementsByClassName('auth-true'))
    .forEach(element => $(element).addClass('d-none'))
  Array.from(document.getElementsByClassName('auth-data'))
    .forEach(element => $(element).addClass('d-none'))
  $('#search-plant-button')
    .addClass('btn-outline-light')
    .removeClass('btn-warning')
}
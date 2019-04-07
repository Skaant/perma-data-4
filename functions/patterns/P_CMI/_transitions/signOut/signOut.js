export default specific => {
  specific && specific()

  Array.from(document.getElementsByClassName('auth-none'))
    .forEach(element => $(element).removeClass('d-none'))
  Array.from(document.getElementsByClassName('auth-true'))
    .forEach(element => $(element).addClass('d-none'))
}
export default (err, type) => {
  $('#launch-info').addClass('d-none')

  $('#error-modal__label, #error-info__status')
    .html(window.__loadingTexts__[type])
  $('#error-modal__title')
    .html(err.title || err.name)
  $('#error-modal__description')
    .html(err.message)
    
  console.log(err)
  
  $('#error-button')
    .click(() => $('#error-modal').modal('show'))

  $('#error-info').removeClass('d-none')
  $('#error-modal').modal('show')
}
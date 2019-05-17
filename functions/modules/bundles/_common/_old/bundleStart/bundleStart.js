export default () => {
  Array.from(document.getElementsByClassName('loading-bundle'))
    .forEach(element => $(element)
      .html(loadingTexts.lang))
}
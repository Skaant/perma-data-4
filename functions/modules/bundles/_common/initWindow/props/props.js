export default () => {
  const html = document.getElementsByTagName('html')[0]
  window.__PROPS__ = {
    id: html.id,
    lang: html.lang
  }
}
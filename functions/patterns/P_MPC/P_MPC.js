module.exports = (id, lang, queryProps) => {
  fetch(`/api/modules?id=${ id }&lang=${ lang }&${ queryProps }`, {
    method: 'GET'
  })
  .then(result => result.json())
  .then(props => console.log(props))
}
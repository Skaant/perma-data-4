module.exports = (id, lang, queryProps) => 
  new Promise((resolve, reject) => 
    fetch(`/api/modules/provision?id=${ id }&lang=${ lang }&${ queryProps }`, {
      method: 'GET'
    })
    .then(result => result.json())
    .then(props => resolve(props))
    .catch(err => reject(err)))
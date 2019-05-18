module.exports = (id, lang, queryProps) => 
  new Promise((resolve, reject) => 
    fetch(`/api/modules/provision?id=${ id }&lang=${ lang }&${ queryProps }`, {
      method: 'GET'
    })
    .then(result => {
      if (result.ok) {
        return result.json()
      } else {
        throw result.json()
      }
    })
    .then(props => resolve(props))
    .catch(errPromise =>
      errPromise.then(err => reject(err))))
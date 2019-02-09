module.exports = props =>
  new Promise((resolve, reject) =>
    Promise.all([
      global.db.collection('translations')
        .doc(`global-${ props.lang }`).get(),
      global.db.collection('translations')
        .doc(`${ props.id }-${ props.lang }`).get()
    ])
      .then(([global, page]) => {
        if (!global.exists) {
          reject({
            status: 404,
            title: 'no global translation',
            message: `missing translation file for "${ props.lang }" language`
          })
        } else if (!page.exists) {
          reject({
            status: 404,
            title: 'no page translation',
            message: `missing translation file "${ props.id }" for "${ props.lang }" language`
          })
        }
        resolve(Object.assign({}, 
          global.exists ? global.data() : {},
          page.exists ? page.data() : {}
        ))
      })
      .catch(err =>
        reject(Object.assign({}, err, {
          title: 'translation request error'
        }))))
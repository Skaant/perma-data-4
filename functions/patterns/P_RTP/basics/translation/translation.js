module.exports = props =>
  new Promise((resolve, reject) => {
    const promises = [
      global.firestore.collection('translations')
        .doc(`global-${ props.lang }`).get()]
    if (props.id) {
      promises.push(global.firestore.collection('translations')
        .doc(`${ props.id }-${ props.lang }`).get())
    }
    console.log(props)
    Promise.all(promises)
      .then(([global, page]) => {
        if (!global.exists) {
          reject({
            status: 404,
            title: 'no global translation',
            message: `missing translation file for "${ props.lang }" language`
          })
        } else if (props.id && !page.exists) {
          reject({
            status: 404,
            title: 'no page translation',
            message: `missing translation file "${ props.id }" for "${ props.lang }" language`,
            translation: global.exists ? global.data() : {}
          })
        }
        resolve(Object.assign({}, 
          global.exists ? global.data() : {},
          (page && page.exists) ? page.data() : {}
        ))
      })
      .catch(err => reject(Object.assign({}, err, {
          title: 'translation request error'
        })))
  })
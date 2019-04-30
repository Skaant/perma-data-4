module.exports = props =>
  new Promise((resolve, reject) => {
    reject({
      title: 'no plant id',
      message: 'you must specify a plant id in the url',
      status: 404,
      translation: props.translation
    })
  })
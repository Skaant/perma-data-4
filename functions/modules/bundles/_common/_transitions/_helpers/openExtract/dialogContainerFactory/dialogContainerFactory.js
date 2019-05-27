export default extract => {
  const lang = window.__PROPS__.lang
  return {
    _id: extract._id,
    [lang]: {
      dialog: {
        title: extract.title
      },
      scenes: {
        extract: Object.assign({}, extract[lang], {
          back: {
            label: '`${ getMainDialogProps().title }`'
          }
        })
      }
    },
    scenes: {
      first: 'extract',
      list: {
        extract: {
          back: {
            click: 'openDialog()'
          }
        }
      }
    }
  }
}
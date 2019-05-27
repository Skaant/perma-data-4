export default extract => {
  const lang = window.__PROPS__.lang
  const { title, content, comments } = extract[lang]
  return {
    _id: extract._id,
    [lang]: {
      dialog: { title },
      scenes: {
        extract: {
          content,
          comments,
          back: {
            label: '`${ getMainDialogProps().title }`'
          }
        }
      }
    },
    scenes: {
      first: 'extract',
      list: {
        extract: {
          pictures: extract.pictures,
          back: {
            click: 'openDialog()'
          }
        }
      }
    }
  }
}
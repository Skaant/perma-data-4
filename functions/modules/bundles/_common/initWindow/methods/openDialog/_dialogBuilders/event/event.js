export default event => {
  const lang = window.__PROPS__.lang
  const { title, scenes } = event[lang]
  return {
    _id: event._id,
    [lang]: {
      dialog: { title },
      scenes
    },
    scenes: event.scenes
  }
}
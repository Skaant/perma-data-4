export default _id => {
    const extract = window.__STATE__.user.data.extracts
      .find(extract =>
        extract._id === _id)
    const lang = window.__PROPS__.lang
    return {
      _id,
      title: extract[lang].title
    }
  }
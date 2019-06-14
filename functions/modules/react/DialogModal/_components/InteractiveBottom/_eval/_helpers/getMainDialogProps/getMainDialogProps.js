export default () => {
  const main = window.__STATE__.user.data.dialogs
    .find(dialog => dialog.baseData.main)
  return {
    _id: main._id,
    title: main[
      window.__PROPS__.lang].dialog.title
  }
}
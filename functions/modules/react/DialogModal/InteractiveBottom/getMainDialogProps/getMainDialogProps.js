export default () => {
  const lastDialogProps = window.__STATE__.dialogs[
    window.__STATE__.dialogs.length - 1]
  const data = window.__STATE__.user.data
  const lastDialog = data.dialogs
    .find(dialog => dialog._id === lastDialogProps._id)
  return {
    _id: lastDialog._id,
    title: lastDialog[
      window.__PROPS__.lang].dialog.title
  }
}
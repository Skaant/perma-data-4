export default id =>
  window.__STATE__.user.data.dialogs
  .find(dialog => dialog._id === id)
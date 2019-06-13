export default () =>
  window.__STATE__.user.data.dialogs
    .find(dialog => dialog.baseData.main)
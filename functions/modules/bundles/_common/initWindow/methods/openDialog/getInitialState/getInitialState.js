export default (type, id, options, dialog) => {
  const dialogsState = window.__STATE__.dialogs

  let key = false
  if (type === 'main') {
    key = `dialog-${ dialog._id }`
  } else if (type === 'previous') {
    key = dialogsState.history[1]
  } else {
    key = `${ type }-${ id }`
  }
  const entry = key && dialogsState.list[key]

  if (entry) {
    return entry
  } else {
    return {
      uid: window.__STATE__.user.uid,
      key,
      type,
      _id: type === 'main' ? dialog._id : id,
      sceneKey: dialog.scenes.first,
      scope: dialog.initScope || {},
      form: {}
    }
  }
}
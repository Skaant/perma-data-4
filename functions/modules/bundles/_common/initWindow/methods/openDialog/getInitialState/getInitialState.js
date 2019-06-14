export default (type, id, options, dialog) => {
  const dialogsState = window.__STATE__.dialogs
  const user = window.__STATE__.user

  let key = false
  if (type === 'main') {
    key = `dialog-${ dialog._id }`
  } else if (type === 'previous') {
    key = dialogsState.history[1]
  } else if (type === 'dom') {
    const dom = user.data.doms
      .find(dom => dom._id === id)
    key = `dom-${ dom._id }-${ options.dialog }`
  } else {
    key = `${ type }-${ id }`
  }
  const entry = key && dialogsState.list[key]

  if (entry) {
    return entry
  } else {
    return {
      uid: user.uid,
      key,
      type: type === 'main' ? 'dialog' : 
        type === 'previous' ? entry.type : type,
      _id: type === 'main' ? dialog._id : id,
      sceneKey: dialog.scenes.first,
      scope: (dialog.userData && dialog.userData.initScope) || {},
      form: {},
      options
    }
  }
}
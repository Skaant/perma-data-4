export default () => {
  const lang = window.__PROPS__.lang
  const previous = window.__STATE__.dialogs.list[
    window.__STATE__.dialogs.history[1]]
  switch (previous.type) {
    case 'dialog':
      const dialog = window.__STATE__.user.data.dialogs
        .find(dialog => dialog._id === previous._id)
      return {
        _id: dialog._id,
        title: dialog[lang].dialog.title
      }
    case 'dom':
      const dom = window.__STATE__.user.data.doms
        .find(dom => dom._id === previous._id)
      const dialogKey = previous.options.dialog
      const domDialog = Object.assign({},
        dom.dialogs[dialogKey],
        dom[lang].dialogs[dialogKey])
      return {
        title: domDialog.dialog.title
      }
  }
}
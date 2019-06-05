export default (dom, options) => {
  const lang = window.__PROPS__.lang
  const dialogKey = options.dialog
  const baseDialog = dom.dialogs[dialogKey]
  const langDialog = dom[lang].dialogs[dialogKey]
  return {
    _id: dom._id,
    [lang]: langDialog,
    ...baseDialog
  }
}
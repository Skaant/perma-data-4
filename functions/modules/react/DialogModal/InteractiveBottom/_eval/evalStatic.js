import _helpers from './_helpers'


export default (code, {
  scope, form,
  dialog, scene
}) => {
  const lang = window.__PROPS__.lang
  const { 
    getMainDialogProps,
    getExtractProps
  } = _helpers
  // unused params are meant to be consumed by eval call
  return code && eval(code)
}
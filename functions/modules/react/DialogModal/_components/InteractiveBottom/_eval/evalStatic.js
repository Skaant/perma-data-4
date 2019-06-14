import _helpers from './_helpers'


export default (code, {
  data, scope, form,
  dialog, scene
}) => {
  const lang = window.__PROPS__.lang
  const { 
    getMainDialogProps,
    getExtractProps,
    getPreviousDialogProps
  } = _helpers
  // unused params are meant to be consumed by eval call
  return code && eval(code)
}
export default (click, {
  goToScene,
  scope, setScope,
  form, setForm, sendForm
}) => {
  const { openDialog, closeDialog } = window.__METHODS__
  // unused params are meant to be consumed by eval call
  click && eval(click)
}
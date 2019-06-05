export default (click, { dom }) => {
  const { openDialog, closeDialog } = window.__METHODS__
  
  // unused params are meant to be consumed by eval call
  click && eval(click)
}
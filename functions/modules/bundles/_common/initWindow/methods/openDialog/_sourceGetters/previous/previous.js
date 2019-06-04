import _sourceGetters from '..'

export default () => {
  const dialogsState = window.__STATE__.dialogs
  const { type, id, options } = dialogsState.list[
    dialogsState.history[1]]
  return _sourceGetters[type](id, options)
}
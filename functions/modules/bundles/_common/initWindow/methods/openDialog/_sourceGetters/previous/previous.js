import _sourceGetters from '..'

export default () => {
  const dialogsState = window.__STATE__.dialogs
  const { type, _id, options } = dialogsState.list[
    dialogsState.history[1]]
  return Object.assign({}, _sourceGetters[type](_id, options), {
    type,
    options
  })
}
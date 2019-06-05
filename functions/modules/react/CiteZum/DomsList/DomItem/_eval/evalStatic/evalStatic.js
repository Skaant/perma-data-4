export default (code, { dom }) => {
  const lang = window.__PROPS__.lang

  // unused params are meant to be consumed by eval call
  return code && eval(code)
}
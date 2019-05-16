module.exports = (valid, form) => {
  if (typeof valid === 'string')
    return eval(valid)(form) ? 'success' : 'warning'
  return 'warning'
}
module.exports = (valid, form) => {
  if (typeof valid === 'string')
    return typeof eval(valid)(form) === 'number' ? 'success' : 'warning'
  return 'warning'
}
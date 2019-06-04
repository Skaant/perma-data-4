module.exports = (valid, scope, form) => {
  if (!valid) {
    return 'warning'
  }
  if (typeof valid === 'boolean' || typeof valid === 'string')
    return eval(valid) ? 'success' : 'warning'
  return 'warning'
}
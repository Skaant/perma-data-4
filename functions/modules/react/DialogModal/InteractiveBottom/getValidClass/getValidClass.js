module.exports = (valid, scope, form) => {
  if (typeof valid === 'string')
    return eval(valid) ? 'success' : 'warning'
  return 'warning'
}
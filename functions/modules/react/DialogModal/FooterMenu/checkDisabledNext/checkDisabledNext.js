module.exports = (disabledNext, form) => {
  if (disabledNext === true)
    return true
  else if (typeof disabledNext === 'string')
    return eval(disabledNext)(form)
  return false
}
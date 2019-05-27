import getExtractProps from './getExtractProps/getExtractProps'

const evalLine = (line, {
  getExtractProps
}) => {
  let scope = {}
  eval(line)
  return scope
}

export default initScope => {
  if (!initScope) {
    return {}
  }
  const options = {
    getExtractProps
  }
  return initScope.reduce((scope, line) => {
    return Object.assign({}, scope, evalLine(line, options))
  }, {})
}
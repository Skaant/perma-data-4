import getExtractPropsFactory from './getExtractPropsFactory/getExtractPropsFactory'

const evalLine = (line, {
  getExtractProps
}) => {
  let scope = {}
  eval(line)
  return scope
}

export default (props) => {
  const initScope = props.dialog.initScope

  if (!initScope) {
    return {}
  }
  const options = {
    getExtractProps: getExtractPropsFactory(props)
  }
  return initScope.reduce((scope, line) => {
    return Object.assign({}, scope, evalLine(line, options))
  }, {})
}
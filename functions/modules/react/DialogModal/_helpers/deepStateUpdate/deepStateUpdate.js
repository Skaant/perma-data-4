export default (baseState, {
  scope,
  ...stateUpdate
}) => 
  Object.assign({}, baseState, stateUpdate, {
    scope: Object.assign({}, baseState.scope, scope)
  })
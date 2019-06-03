import props from './props/props'
import state from './state/state'
import methods from './methods/methods'

export default options => {
  props(options.props),
  state(options.state),
  methods(options.methods)
}
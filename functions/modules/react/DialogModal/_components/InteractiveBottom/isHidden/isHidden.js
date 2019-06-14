import evalStatic from '../_eval/evalStatic'

export default (item, props) =>
  !item || !item.click
    || item.hidden && evalStatic(item.hidden, props)
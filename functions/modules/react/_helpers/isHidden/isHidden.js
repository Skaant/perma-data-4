export default (item, props, evalStatic) =>
  !item || !item.click
    || item.hidden && evalStatic(item.hidden, props)
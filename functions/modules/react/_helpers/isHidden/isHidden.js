export default (item, props, evalStatic) =>
  !item || (!item.click && !item.type)
    || item.hidden && evalStatic(item.hidden, props)
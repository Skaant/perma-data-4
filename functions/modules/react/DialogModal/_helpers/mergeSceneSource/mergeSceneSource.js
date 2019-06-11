export default (baseScene, langScene) => 
  langScene ? { ...baseScene, ...langScene, ...{
    menu: baseScene.menu && ({
      order: baseScene.menu.order,
      list: Object.keys(baseScene.menu.list)
        .map(key => 
          Object.assign({}, { key }, 
            baseScene.menu.list[key],
            langScene.menu && langScene.menu[key] || {}))
        .reduce((list, { key, ...item }) => {
          list[key] = item
          return list
        }, {})
    }),
    back: { ...baseScene.back, ...langScene.back },
    back2: { ...baseScene.back2, ...langScene.back2 },
    next: { ...baseScene.next, ...langScene.next },
    next2: { ...baseScene.next2, ...langScene.next2 }
  }} : baseScene
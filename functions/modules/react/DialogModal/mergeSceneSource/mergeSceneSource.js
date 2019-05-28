export default (baseScene, langScene) => 
  langScene ? { ...baseScene, ...langScene, ...{
    menu: baseScene.menu && ({
      order: baseScene.menu.order,
      list: Object.keys(baseScene.menu.list)
        .map(key => ({
          key,
          ...baseScene.menu.list[key],
          ...langScene.menu[key]
          }))
        .reduce((list, { key, ...item }) => {
          list[key] = item
          return list
        }, {})
    }),
    back: { ...baseScene.back, ...langScene.back },
    next: { ...baseScene.next, ...langScene.next }
  }} : baseScene
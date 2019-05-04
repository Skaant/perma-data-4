module.exports = (dialogs, lang) =>
  dialogs.map(dialog => Object.assign({}, {
    _id: dialog._id,
    openFirst: dialog.openFirst,
    scenes: dialog.scenes.map((scene, index) =>
      Object.assign({}, scene, dialog[lang][index], {
        menu: (scene.menu && dialog[lang][index].menu) ? 
          scene.menu.map((item, _index) => Object.assign({}, item, {
            label: dialog[lang][index].menu[_index]
          }))
        : false
      }))
  }))
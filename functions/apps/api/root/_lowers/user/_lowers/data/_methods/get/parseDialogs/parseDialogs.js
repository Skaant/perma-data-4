module.exports = (dialogs, lang) => dialogs.map(dialog => ({
    _id: dialog._id[0],
    openFirst: dialog.openFirst[0],
    scenes: dialog.scenes[0].map((scene, index) =>
      Object.assign({}, scene, dialog[lang][0][index], {
        menu: (scene.menu && dialog[lang][0][index].menu) ? 
          scene.menu.map((item, _index) => Object.assign({}, item, {
            label: dialog[lang][0][index].menu[_index]
          }))
        : false
      })) ,
    disabledNext: dialog.disabledNext
  }))
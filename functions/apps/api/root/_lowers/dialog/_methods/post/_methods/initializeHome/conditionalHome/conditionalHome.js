const baseDomList = {
  'SPARKERS': {},
  'PHOTO-FACTORY': {},
  'PHOTO-CELLS': {
    quantity: 5
    
  },
  'NOVS': {},
  'EXPLORERS': {},
  'HARVESTERS': {
    level: 5
  },
  'MIKORIS': {},
  'LOOKOUT': {}
}

const sparkersDomList = value => {
  switch(value) {
    case 0:
      return {
        'PHOTO-CELLS': {
          quantity: 10
        }
      }
    case 1:
      return {
        'PHOTO-SENSIBLE BUDS': {}
      }
    case 2:
      return {
        'SEV FLUIDIFIER': {}
      }
  }
}

const novsDomList = value => {
  switch(value) {
    case 0:
      return {
        'HARVESTERS': {
          level: 10
        }
      }
    case 1:
      return {
        'VAPORIZERS': {}
      }
    case 2:
      return {
        'NOVS': {
          watchSeeds: 1
        }
      }
  }
}

const mikorisDomList = value => {
  switch(value) {
    case 0:
      return {
        'DATA-SLICE SPEAR': {}
      }
    case 1:
      return {
        'STATIC LOADER': {}
      }
    case 2:
      return {
        'DATA INDEX': {}
      }
  }
}

module.exports = form => Object.assign({}, {
  doms: Object.assign({}, baseDomList,
    sparkersDomList(form.SPARKERS),
    novsDomList(form.NOVS),
    mikorisDomList(form.MIKORIS))
})
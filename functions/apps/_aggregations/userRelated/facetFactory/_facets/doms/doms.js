module.exports = lang => ([
  {
    '$project': {
      'doms': {
        '$objectToArray': '$home.doms'
      }
    }
  }, {
    '$project': {
      'doms': {
        '$map': {
          'input': '$doms', 
          'as': 'dom', 
          'in': {
            '$mergeObjects': [
              {
                '_id': '$$dom.k'
              }, '$$dom.v'
            ]
          }
        }
      }, 
      '_domsIds': '$doms.k'
    }
  }, {
    '$lookup': {
      'from': 'doms', 
      'localField': '_domsIds', 
      'foreignField': '_id', 
      'as': '_doms'
    }
  }, {
    '$project': {
      'doms': {
        '$concatArrays': [
          {
            '$map': {
              'input': '$doms', 
              'as': 'dom', 
              'in': {
                'k': '$$dom._id', 
                'v': '$$dom'
              }
            }
          }, {
            '$map': {
              'input': '$_doms', 
              'as': 'dom', 
              'in': {
                'k': '$$dom._id', 
                'v': {
                  'statics': '$$dom.statics',
                  'menu': '$$dom.menu',
                  'dialogs': '$$dom.dialogs',
                  [lang]: `$$dom.${ lang }`
                }
              }
            }
          }
        ]
      }
    }
  }, {
    '$unwind': '$doms'
  }, {
    '$group': {
      '_id': '$doms.k', 
      'data': {
        '$mergeObjects': '$doms.v'
      }
    }
  }, {
    '$replaceRoot': {
      'newRoot': '$data'
    }
  }
])
module.exports = lang => ([
  {
    '$project': {
      'dialogs': {
        '$objectToArray': '$dialogs'
      }
    }
  }, {
    '$project': {
      'dialogs': '$dialogs', 
      '_dialogs': {
        '$map': {
          'input': '$dialogs', 
          'as': 'dialog', 
          'in': {
            '$mergeObjects': [
              {
                '_id': '$$dialog.k'
              }, '$$dialog.v'
            ]
          }
        }
      }, 
      '_dialogsIds': '$dialogs.k'
    }
  }, {
    '$lookup': {
      'from': 'dialogs', 
      'localField': '_dialogsIds', 
      'foreignField': '_id', 
      'as': '_dialogs'
    }
  }, {
    '$project': {
      'dialogs': {
        '$concatArrays': [{
          '$map': {
            'input': '$dialogs', 
            'as': 'dialog', 
            'in': {
              'k': '$$dialog.k', 
              'v': {
                'userData': '$$dialog.v'
              }
            }
          }
        }, {
            '$map': {
              'input': '$_dialogs', 
              'as': 'dialog', 
              'in': {
                'k': '$$dialog._id', 
                'v': {
                  '_id': '$$dialog._id',
                  [lang]: `$$dialog.${ lang }`,
                  'scenes': '$$dialog.scenes',
                  'baseData': '$$dialog.data'
                }
              }
            }
          }
        ]
      }
    }
  }, {
    '$unwind': '$dialogs'
  }, {
    '$group': {
      '_id': '$dialogs.k', 
      'data': {
        '$mergeObjects': '$dialogs.v'
      }
    }
  }, {
    '$replaceRoot': {
      'newRoot': '$data'
    }
  }
])
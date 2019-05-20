module.exports = (uid, lang) => ([
  {
    '$match': {
      '_id': '6cCpcBIxoUR90qGtV3LwuuRX6jP2'
    }
  }, {
    '$facet': {
      'dialogs': [
        {
          '$lookup': {
            'from': 'dialogs', 
            'localField': 'dialogs', 
            'foreignField': '_id', 
            'as': 'provisionedDialogs'
          }
        }, {
          '$unwind': '$provisionedDialogs'
        }, {
          '$project': {
            '_id': '$provisionedDialogs._id', 
            [lang]: `$provisionedDialogs.${ lang }`,
            'scenes': '$provisionedDialogs.scenes', 
            'openFirst': '$provisionedDialogs.openFirst'
          }
        }
      ], 
      'doms': [
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
      ]
    }
  }
])
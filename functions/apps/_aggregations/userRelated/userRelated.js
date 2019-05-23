module.exports = (uid, lang) => ([
  {
    '$match': {
      '_id': uid
    }
  }, {
    '$facet': {
      'dialogs': [
        {
          '$lookup': {
            'from': 'dialogs', 
            'localField': 'dialogs', 
            'foreignField': '_id', 
            'as': '_dialogs'
          }
        }, {
          '$unwind': '$_dialogs'
        }, {
          '$lookup': {
            'from': 'extracts', 
            'localField': '_dialogs.extracts', 
            'foreignField': '_id', 
            'as': '_extracts'
          }
        }, {
          '$project': {
            '_id': '$_dialogs._id', 
            [lang]: `$_dialogs.${ lang }`, 
            'extracts': {
              '$arrayToObject': {
                '$map': {
                  'input': '$_extracts', 
                  'as': 'extract', 
                  'in': {
                    'k': {
                      '$convert': {
                        'input': '$$extract._id', 
                        'to': 'string'
                      }
                    }, 
                    'v': {
                      [lang]: `$$extract.${ lang }`, 
                      'tags': '$$extract.tags',
                      'pictures': '$$extract.pictures'
                    }
                  }
                }
              }
            }, 
            'scenes': '$_dialogs.scenes', 
            'openFirst': '$_dialogs.openFirst'
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
module.exports = lang => ([
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
])
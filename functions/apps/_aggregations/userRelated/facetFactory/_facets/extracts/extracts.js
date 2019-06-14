module.exports = lang => ([
  {
    '$lookup': {
      'from': 'extracts', 
      'localField': 'extracts', 
      'foreignField': '_id', 
      'as': '_extracts'
    }
  }, {
    '$unwind': '$_extracts'
  }, {
    '$project': {
      '_id': '$_extracts._id', 
      [lang]: `$_extracts.${ lang }`,
      'tags': '$_extracts.tags',
      'pictures': '$_extracts.pictures',
      'scenes': '$_extracts.scenes',
      'openFirst': '$_extracts.openFirst'
    }
  }
])
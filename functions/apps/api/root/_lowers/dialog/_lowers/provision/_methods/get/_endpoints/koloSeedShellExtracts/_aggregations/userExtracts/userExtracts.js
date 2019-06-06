module.exports = (uid, lang) => ([
  {
    '$match': {
      '_id': uid
    }
  }, {
    '$lookup': {
      'from': 'extracts', 
      'localField': 'home.doms.kolo-seed shell.extracts', 
      'foreignField': '_id', 
      'as': 'extracts'
    }
  }, {
    '$project': {
      'extracts': 1
    }
  }, {
    '$unwind': '$extracts'
  }, {
    '$replaceRoot': {
      'newRoot': '$extracts'
    }
  }, {
    '$project': {
      'tags': 1, 
      [lang]: 1
    }
  }
])
module.exports = () => ([
  {
    '$facet': {
      'frast': [
        {
          '$match': {
            'tags': {
              '$in': [
                'frast'
              ]
            }
          }
        }, {
          '$sample': {
            'size': 2
          }
        }, {
          '$project': {
            '_id': 1
          }
        }
      ], 
      'hol-ong': [
        {
          '$match': {
            'tags': {
              '$in': [
                'hol-ong'
              ]
            }
          }
        }, {
          '$sample': {
            'size': 2
          }
        }, {
          '$project': {
            '_id': 1
          }
        }
      ], 
      'zums': [
        {
          '$match': {
            'tags': {
              '$in': [
                'zums'
              ]
            }
          }
        }, {
          '$sample': {
            'size': 2
          }
        }, {
          '$project': {
            '_id': 1
          }
        }
      ], 
      'trighbs': [
        {
          '$match': {
            'tags': {
              '$in': [
                'trighbs'
              ]
            }
          }
        }, {
          '$sample': {
            'size': 2
          }
        }, {
          '$project': {
            '_id': 1
          }
        }
      ], 
      'kolo-seed': [
        {
          '$match': {
            'tags': {
              '$in': [
                'kolo-seed'
              ]
            }
          }
        }, {
          '$sample': {
            'size': 2
          }
        }, {
          '$project': {
            '_id': 1
          }
        }
      ]
    }
  }, {
    '$project': {
      'frast': {
        '$map': {
          'input': '$frast', 
          'as': 'extract', 
          'in': '$$extract._id'
        }
      }, 
      'hol-ong': {
        '$map': {
          'input': '$hol-ong', 
          'as': 'extract', 
          'in': '$$extract._id'
        }
      }, 
      'zums': {
        '$map': {
          'input': '$zums', 
          'as': 'extract', 
          'in': '$$extract._id'
        }
      }, 
      'trighbs': {
        '$map': {
          'input': '$trighbs', 
          'as': 'extract', 
          'in': '$$extract._id'
        }
      }, 
      'kolo-seed': {
        '$map': {
          'input': '$kolo-seed', 
          'as': 'extract', 
          'in': '$$extract._id'
        }
      }
    }
  }
])
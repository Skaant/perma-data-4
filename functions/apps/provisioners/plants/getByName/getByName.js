module.exports = (key, lang) =>
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('datas')
        .aggregate([
          {
            $match: {
              type: `name.${ lang }`,
              $text: {
                $search: key
              }
            }
          },
          {
            $sort: {
              weight: -1
            }
          },
          {
            $unwind: '$plants'
          },
          {
            $group: {
              _id: '$plants',
              names: {
                $push: '$value'
              }
            }
          }
        ])
        .toArray((err, plants) => {
          if (err) {
            reject(err)
          }
          resolve({ plants })
        })
    })
  })
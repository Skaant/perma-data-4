module.exports = (key, lang) =>
  new Promise((resolve, reject) => {
    global.mongo.connect((err, client) => {
      if (err) {
        reject(err)
      }
      client.db('prod')
        .collection('datas')
        .find({
          type: `name.${ lang }`,
          $text: {
            $search: key
          }
        })
        .toArray((err, plants) => {
          if (err) {
            reject(err)
          }
          resolve({ plants })
        })
    })
  })
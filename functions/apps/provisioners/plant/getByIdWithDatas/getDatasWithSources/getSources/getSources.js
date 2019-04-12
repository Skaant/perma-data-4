module.exports = (client, datas) =>
  new Promise((resolve, reject) => {
    client.db('prod')
      .collection('sources')
      .aggregate([{
        $match: {
          _id: {
            $in: datas
              .reduce((allSources, data) => {
                if (data.sources) {
                  return allSources.concat(data.sources)
                }
                return allSources
              }, [])
          }
        }
      }, {
        $unwind: {
          path: '$parents',
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: 'sources',
          localField: 'parents',
          foreignField: '_id',
          as: 'provisioned_parents'
        }
      }, {
        $unwind: {
          path: '$provisioned_parents',
          preserveNullAndEmptyArrays: true
        }
      }, {
        $group: {
          _id: '$_id',
          title: {
            $first: '$title'
          },
          parents: {
            $push:  '$provisioned_parents'
          }
        }
      }])
      .toArray((err, sources) => {
        if (err) {
          reject(err)
        }
        resolve(sources.reduce((objectSource, {
          _id,
          title,
          parents
        }) => {
          objectSource[_id] = {
            title,
            parents
          }
          return objectSource
        }, {}))
      })})
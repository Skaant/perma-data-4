module.exports = (client, sources) =>
  new Promise((resolve, reject) =>
    client.db('prod')
      .collection('sources')
      .aggregate([{
        $match: {
          _id: {
            $in: sources
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
      }])
      .toArray((err, sources) => {
        if (err) {
          reject(err)
        }
        resolve(sources.reduce((objectSource, {
          _id,
          title,
          provisioned_parents
        }) => {
          objectSource[_id] = {
            title,
            parents: provisioned_parents
          }
          return objectSource
        }, {}))
      }))
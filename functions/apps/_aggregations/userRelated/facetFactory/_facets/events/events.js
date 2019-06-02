module.exports = lang => ([ {
  $lookup: {
    from: 'events',
    localField: 'home.events',
    foreignField: '_id',
    as: '_events'
  }
}, {
  $unwind: '$_events'
}, {
  $project: {
    '_id': '$_events._id',
    [lang]: `$_events.${ lang }`
  }
} ])
module.exports = (dbUsers, { uid, lang }) =>
  dbUsers.aggregate([
    {
      $match: {
        _id: uid
      }
    }, {
      $unwind: {
        path: '$dialogs',
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: 'dialogs',
        localField: 'dialogs',
        foreignField: '_id',
        as: 'dialogsProvisioned'
      }
    }, {
      $group: {
        _id: '$_id',
        pseudo: {
          $first: '$pseudo'
        },
        roles: {
          $first: '$roles'
        },
        dialogs: {
          $push: {
            _id: '$dialogsProvisioned._id',
            openFirst: '$dialogsProvisioned.openFirst',
            scenes: '$dialogsProvisioned.scenes',
            [lang]: `$dialogsProvisioned.${ lang }`,
            disabledNext: '$dialogsProvisioned.disabledNext'
          }
        }
      }
    }
  ])
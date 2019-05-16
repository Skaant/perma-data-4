const P_MPS = require('../../../../../../../../../patterns/P_MPS/P_MPS')

module.exports = req =>
  new Promise((resolve, reject) => {
    const { id, lang } = req.query
    P_MPS(id, lang)
      .then(props => resolve(props))
      .catch(err => reject(err))
  })
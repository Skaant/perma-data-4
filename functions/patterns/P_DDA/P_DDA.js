const P_ERR = require('../P_ERR/P_ERR')
module.exports = _provisioner =>
  (req, res) =>
    _provisioner(req)
      .then(data => res.json(data))
      .catch(err => P_ERR(err, req.lang, res))
  
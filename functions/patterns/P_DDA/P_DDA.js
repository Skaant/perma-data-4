const P_AER = require('../P_AER/P_AER')

module.exports = _provisioner =>
  (req, res) =>
    _provisioner(req)
      .then(data => res.json(data))
      .catch(err => {
        console.log('aaa', err)
        P_AER(err, res)})
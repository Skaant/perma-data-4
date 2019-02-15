const P_AER = require('../P_AER/P_AER')
module.exports = _provisioner =>
  (req, res) =>
    _provisioner(req)
      .then(data =>{
        console.log(data)
        res.json(data)})
      .catch(err => P_AER(err, res))
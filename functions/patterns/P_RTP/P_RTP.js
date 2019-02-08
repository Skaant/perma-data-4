const html = require('./html/html')
const baseProvision = require('./baseProvision/baseProvision')

module.exports = ({ id, _provisioner }) =>
  (req, res) => 
    res.send(
      html(
        _provisioner(
          baseProvision(id, req))))
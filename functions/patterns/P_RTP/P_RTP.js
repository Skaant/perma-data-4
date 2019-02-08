const renderer = require('./renderer/renderer')
const baseProvision = require('./baseProvision/baseProvision')

module.exports = ({ id, _provisioner }) =>
  (req, res) => 
    res.send(
      renderer(
        _provisioner(
          baseProvision(id, req))))
const html = require('./html/html')
const baseProvision = require('./baseProvision/baseProvision')

module.exports = ({ id, provisioner }) =>
  (req, res) => 
    res.send(
      html(
        provisioner(
          baseProvision(id, req))))
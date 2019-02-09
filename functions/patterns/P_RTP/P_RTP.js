const renderer = require('./renderer/renderer')
const basics = require('./basics/basics')
const P_ERR = require('../P_ERR/P_ERR')

module.exports = ({ id, _provisioner }) =>
  (req, res) =>
    basics(id, req)
      .then(props => 
        _provisioner(props)
          .then(props =>{
            try {
              res.send(
                renderer(props))
            } catch(err) {
              P_ERR(err, req.lang, res)
            }}))
      .catch(err => P_ERR(err, req.lang, res))
      
      
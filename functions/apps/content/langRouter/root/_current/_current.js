const html = require('../../../html/html')

module.exports = (req, res) => 
  res.send(
    html({
      id: 'home',
      lang: req.lang || 'fr',
      url: req.url
    }
  )
)
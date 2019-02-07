const head = require('./head/head')
const body = require('./body/body')

module.exports = props => 
`
<html lang="${ props.lang }>
  ${ head(props) }
  ${ body(props) }
</html>
`
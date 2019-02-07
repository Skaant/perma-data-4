const navbar = require('./navbar/navbar')
const footer = require('./footer/footer')
const botScriptSwitch = require('./botScriptSwitch/botScriptSwitch')

module.exports = props =>
`
<body>
  ${ navbar(props) }
  <h1>${ props.title }</h1>
  ${ footer(props) }
  ${ botScriptSwitch(props) }
</body>
`
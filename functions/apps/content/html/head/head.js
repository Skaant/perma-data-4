const linksSwitch = require('./linkSwitch/linkSwitch')
const topScriptsSwitch = require('./topScriptSwitch/topScriptSwitch')

module.exports = props =>
`
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  ${ linksSwitch(props.id) || '' }
  ${ topScriptsSwitch(props.id) || '' }
  <title>
    ${ props.title ?
      `${ props.title } - ` : '' }PERMADATA ${ props.lang.toUpperCase() }
  </title>
  ${ (props.meta && props.meta.title) ?
    `<meta name="title" content=${ props.meta.title }">` : ''
  }
  ${ (props.meta && props.meta.description) ?
    `<meta name="description" content=${ props.meta.description }">` : ''
  }
  <meta name="keywords" content="permaculture,data${
    (props.meta && props.meta.keywords) ? 
      `,${ props.meta.keywords }` : '' }">
</head>
`
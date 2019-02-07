module.exports = props => 
`
<nav id='header' class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/${ props.lang }">PERMADATA</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbar-content">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ props.lang }/inventory'>
          ${ (props.langs && props.langs.inventory) || 'inventory' }</a></li>
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ props.lang }/contributor'>
          ${ (props.langs && props.langs.contributor) || 'contributor' }</a></li>
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item mx-1">
        <a class="nav-link" href='/${ props.lang === 'en' ? 'fr' : 'en' }${ props.url }'
            title='${ props.lang === 'en' ? 'fr' : 'en' }'>
          ${ props.lang === 'en' ? 'en' : 'fr' }</a></li>
    </ul>
  </div>
</nav>
`
# perma-data-4

## functions, server [app]s
two [app]s are imported in the `functions/index.js` file :
* api (from `./apps/api`), for client-side queries
* content (from `./apps/content`), for page server-side rendering

access to these [app]s is set in the `firebase.json` file such as :
```javascript
"rewrites": [
  {
    // url starts with 'api' keyword
    "source": "/api/**",
    "function": "api"
  },
  {
    // default fallback
    "source": "**",
    "function": "content"
  }
]
```

## patterns

### P_RCL (router, currents, lowers)
*project, arborescence, route, router*

#### concept
to process the routing map, three objets are used :
* router (**node**), contains _currents &/or _lowers props
* _currents (**leaves**), object, associate a *method* keyword with a function *handler*
* _lowers (**branches**), object, associate an atomic *path* with a sub-*router*

```javascript
const router = { currents, lowers }
const currents = { *[method]: handler }
// where method from ['get', 'put', 'post', 'delete' ...]
const lowers = { *[path]: router }
```

#### usage
find the root **node** of a P_RCL arborescence
* content: `apps/content/langRouter/root/root.js`
* api: `apps/api/root/root.js`

from there is used the following recursive folder pattern :
```
{ node-folder }
  +-- { node-file }
  +-- _currents
  |   +-- { method-folder }
  |   |   +-- { method-file }
  |   +-- ..*
  |   +-- index.js
  +-- _lowers
  |   +-- { node-folder }
  |   +-- ..*
  |   +-- index.js
```
to add a route, create a { methode-file } at the right place in the hierarchy

see generic file content below :

##### { node-file }.js
```javascript
const _currents = require('./_currents')
const _lowers = require('./_lowers')

module.exports = {
  _currents,
  _lowers
}
```

##### _currents/index.js
```javascript
const methodA = require('./{ methodA-folder }/{ methodA-file }')
const methodB = require('./{ methodB-folder }/{ methodB-file }')

module.exports = { 
  methodA,
  methodB
}
```

##### _currents/{ method-folder }/{ method-file }.js
```javascript
module.exports = (req, res) => res.send()
```

##### _lowers/index.js
```javascript
const pathA = require('./{ nodeA-folder }/{ nodeA-file }')
const pathB = require('./{ nodeB-folder }/{ nodeB-file }')

module.exports = {
  pathA,
  pathB
}
```

## lexicon

### app
an app is server-side. It receives delegation of a route logic part in `functions/index.js`
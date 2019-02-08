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

### P_RCL (router, current, lowers)
*project, arborescence, route, router*

#### concept
to process the routing map, three objets are used :
* router (**node**), contains _currents &/or _lowers props
* _current (**leaf**), function, implement the *get* method
* _lowers (**branches**), object, associate an atomic *path* with a sub-*router*

```javascript
const router = { current, lowers }
const current = handler
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
  +-- _current
  |   +-- _current.js
  +-- _lowers
  |   +-- { node-folder }
  |   +-- ..*
  |   +-- index.js
```
to add a route, create a *_current* file & repository at the right place in the hierarchy

see generic file content below :

##### { node-file }.js
```javascript
const _current = require('./_current')
const _lowers = require('./_lowers')

module.exports = {
  _current,
  _lowers
}
```

##### _current/_current.js
```javascript
module.exports = (req, res) => res.send()
```

##### _lowers/index.js
```javascript
const nodeA = require('./{ nodeA-folder }/{ nodeA-file }')
const nodeB = require('./{ nodeB-folder }/{ nodeB-file }')

module.exports = {
  nodeA,
  nodeB
}
```

## lexicon

### app
an app is server-side. It receives delegation of a route logic part in `functions/index.js`
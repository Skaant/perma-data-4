# perma-data-4

## use of patterns

### black-boxed code patterns
### developer structured behavior patterns (guidelines)

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
*project, arborescence, structure, route, router*

#### concept
to process the routing map, three objets are used :
* router (**node**), contains _currents &/or _lowers props
* _current (**leaf**), [provisioner] function, implement the default *get* page method data requests
* _lowers (**branches**), object, associate an atomic *path* with a sub-*router*

```javascript
const router = { current, lowers }
const current = handler
const lowers = { *[path]: router }
```

#### files structure & content
following file organization is enforced by the pattern
```
{ node-folder }
  +-- { node-file }
  +-- _current
  |   +-- _provisioner
  |   |   +-- _provisioner.js
  |   +-- _current.js
  +-- _lowers
  |   +-- { node-folder }
  |   +-- ..*
  |   +-- index.js
```

##### { node-file }.js
group the current provider
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
module.exports = props => {
  const { id, lang, url } = props
  return props
}
```

##### _current/_provisioner/_provisioner.js
see `P_RTP` pattern details

##### _lowers/index.js
```javascript
const nodeA = require('./{ nodeA-folder }/{ nodeA-file }')
const nodeB = require('./{ nodeB-folder }/{ nodeB-file }')
// node..N

module.exports = {
  nodeA,
  nodeB
}
```

#### usage 1 : add P_RCL arborescence root
where you should have associate a new router, use the P_RCL method
```javascript
const target = app || router
target.use(P_RCL(root))
```
the root object is a router node file

#### usage 2 : add a route to arborescence
from the root of a P_RCL arborescence, crawl node tree
* content: `apps/content/langRouter/root/root.js`
* api: `apps/api/root/root.js`

find or create a *_current* repository & file at the target level

### P_RTP (render target page)
* keywords: *provision, render, html, req, page*
* used by: **P_RCL**

#### concept
at every content route endpoint (*_current* from [P_RCL]), encapsultate provision & rendering

#### files structures & content
see `P_RCL` *_current* folder structure for context

##### _current/_provisioner/_provisioner.js
```javascript
module.exports = props => {
  const { id, lang, url } = props
  return Object.assign({}, props)
}
```

## lexicon

### app
an app is server-side. It receives delegation of a route logic part in `functions/index.js`

### provisioner
a provisioner isolate a page data provisioning logic (required before rendering)
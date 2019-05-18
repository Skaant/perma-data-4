# perma-data-4

#### starting the project
1. cd functions
2. firebase serve
## client bundle _common
> functions/modules/bundles/_common/_common.js

executes the **basic steps** (as shown below) for the [page bundle app] launch

### app steps
app lives on the [page bundle], and cannot be instanciated before bundle reception

#### bundle received
the [page bundle] has been received, and app started to execute
next steps are :
* *bundle error*
* *bundle data fetch*
* **put a listener for :** *user authenticated*

#### bundle error
base bundle execution encountered an error

**it brokes the app** (dynamics components could be dismissed, but static content should remain)

possible cause :
* firebase initialization
* error in _transitions.bundleReceived
* error in _transitions.bundleDataFetch
* error in _transitions.unauthApp

#### bundle data fetch
app started fetching the [page bundle] data (like translations, base modules inputs ..)

next steps are :
* *bundle error* (client-side error)
* *bundle data error* (server-side error)
* *bundle data provisioned* + *unauth app*

#### bundle data error
fetching encountered an error

**it brokes the app** (dynamics components could be dismissed, but static content should remain)

#### bundle data provisioned
[page bundle] data has been sucessfully fetched, and base modules can be rendered

next step is :
* *bundle error*
* *unauth app*
* *auth app* (**only if :** user has authenticated and its data has already been fetched)

#### unauth app
app is listening for *user authenticated*, and its changes can now be rendered too

**user can connect**

next step is :
* *bundle error*
* *user authenticated* (**manual**)

#### user authenticated
authentication provider received a non-null user

next step is :
* *user authenticated error*
* *user data fetch*

#### user authenticated error
user modules execution encountered an error

* **app keeps runing**, but user features are broken
* **user can disonnect**

*user-related component could be dismissed, but base components and static content should remain*

possible causes :
* error in _transitions.userAuthenticated
* error in _transitions.userDataFetch (client-side)
* error in _transitions.userDataProvisioned
* error in _transitions.authApp

next step is :
* *unauth app* (**manual**)

#### user data fetch
app started fetching user-related data (like dialogs, doms ...)

next steps are :
* *user authenticated error* (client-side error)
* *user data error* (server-side error)
* *user data provisioned*

#### user data error
fetching encountered an error

* **app keeps runing**, but user features are broken
* **user can disonnect**

*user-related component could be dismissed, but base components and static content should remain*

next step is :
* *unauth app*

#### user data provisioned
user data has been succesfully fetched, but **components aren't rendered here, as we need to check both { bundle } and { user } data availabilities before**

next step is :
* *user authenticated error*
* *auth app* (**only if :** bundle data has already been fetched, else, wait for its resolution)

#### auth app
user data has been received, and user's module can be rendered

( **auth app is accessed only if both { bundle } and { user } data has been successfully fetched** )

**user can disconnect**

next step is :
* *user authenticated error*
* *unauth app* (**manual**)

## object references

### data types & formats

* name.{ lang }
* light
* moisture
* hardiness.zone
* foliage

### error

* title
* status (code)
* message

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
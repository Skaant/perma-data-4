# perma-data-4

## starting the application
1. cd functions
2. firebase serve
## table of content

### data
* [WIP](WIP-(v4.2))
* [object references](object-references)

### concepts

#### client
* **client bundle**
  * [_common](#client-bundle-_common)
  * `window.__PROPS__`
  * `window.__STATE__`
  * `window.__METHODS__`
* **dialogs**
  * [logic](#dialogs logic)
  * [`<DialogModal/>` component](#dialog-component),
  * [`dialog` prop object specification](#dialog-object-input-specification)
  * `window.__METHODS__.openDialog(type[, id])`
  * `window.__STATE__.dialogs`

#### server
* **mongo aggregations** 
* [server apps](#server-apps) (**content** & **api**)
* routing [router factory](# router-factory)

## WIP (v4.2)

### goals & done
*refer to the [PERMADATA trello board](https://trello.com/b/WkynhqO6/permadata)*

#### done
* client bundle rework with :
  * window variables `__PROPS__: { (page) id, lang }` and `__STATE__: { bundle, user: { .., data }}`
  * [execution steps](#execution-steps),
  * steps' common and page-specific _transitions agregation

#### goals
* dialog rework
* city component (& dom cards)
* trighbs gameplay mechanisms

### obsolete directories
directories to progressively move and delete

* **patterns**, move to their higher level context folder
* **apps/provisioners**, move to **apps/aggregations**

## client bundle _common
> functions/modules/bundles/_common/_common.js

run through the **application lifecycle** for the [page bundle app] launch

### execution steps
app lives on the [page bundle], and cannot be instanciated before bundle reception

#### "initial"
[page bundle] hasn't be received

**this state is for SSR only : it cannot be accessed by the application**

##### next step
* *bundle received*

#### "bundle received"
the [page bundle] has been received, and app started to execute

##### next steps
* *bundle error*
* *bundle data fetch*
* put a **listener on user authentication :** *user authenticated*

#### "bundle error"
base bundle execution encountered an error

##### features
* **it brokes the app** (think about dismissig dynamic components)

##### possible causes
* firebase initialization
* error in _transitions.bundleReceived
* error in _transitions.bundleDataFetch
* error in _transitions.unauthApp

#### "bundle data fetch"
app started fetching the [page bundle] data (like translations, base modules inputs ..)

##### next steps
* *bundle error* (client-side error)
* *bundle data error* (server-side error)
* *bundle data provisioned* + *unauth app*

#### "bundle data error"
fetching encountered an error

##### features
* **it brokes the app** (think about dismissig dynamic components)

#### "bundle data provisioned"
[page bundle] data has been sucessfully fetched, and base modules can be rendered

##### next steps
* *bundle error*
* *unauth app*
* *auth app* (**only if :** user has authenticated and its data has already been fetched)

#### "unauth app"
app is listening for *user authenticated*, and its changes can now be rendered too

##### features
* **user can connect**

##### next steps
* *bundle error*
* *user authenticated* (**manual**)

#### "user authenticated"
authentication provider received a non-null user

##### next steps
* *user authenticated error*
* *user data fetch*

#### "user authenticated error"
user modules execution encountered an error

##### features
* **app keeps runing**, but user features are broken (think about dismissing them)
* **user can disonnect**

##### possible causes
* error in _transitions.userAuthenticated
* error in _transitions.userDataFetch (client-side)
* error in _transitions.userDataProvisioned
* error in _transitions.authApp

##### next step
* *unauth app* (**manual**)

#### "user data fetch"
app started fetching user-related data (like dialogs, doms ...)

##### next steps
* *user authenticated error* (client-side error)
* *user data error* (server-side error)
* *user data provisioned*

#### "user data error"
fetching encountered an error

##### features
* **app keeps runing**, but user features are broken (think about dismissing them)
* **user can disonnect**

#### next step is
* *unauth app*

#### "user data provisioned"
user data has been succesfully fetched, but **components aren't rendered here, as we need to check both { bundle } and { user } data availabilities before**

##### next steps
* *user authenticated error*
* *auth app* (**only if :** bundle data has already been fetched, else, wait for its resolution)

#### "auth app"
**auth app is accessed only if both { bundle } and { user } data has been successfully fetched** 

user data has been received, and user's module can be rendered

##### features
**user can disconnect**

##### next steps
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

## server apps
two apps, taking the shape of a **router node** (see below), are imported in the `functions/index.js` file :
* **api** (from `./apps/api`), for client-side queries
* **content** (from `./apps/content`), for page server-side rendering

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

## router factory
*P_RCL is to move outside of the pattern directory*

### usage
`routerFactory = ({ _current, _params, _methods, _lowers = {} }, isApi)`

to calculate the route tree, the router factory consumes a **router node** as its main param


`isApi`, is used by the *api [server] app** to enable special routing behaviour (like : light-weighted provisioning; or JSON-formated error, instead of HTML error page)

#### route tree
the router factory returns a route tree, featuring :
* static url routes (**_lowers**)
* dynamic parameters url routes (**_params**) [**only last url component can be handled as a parameter in the current version !**]

the **_params**' keys describe a `/:key` url component, which can then be accessed in the endpoint callback with ``

preferably, all routes should implement at least one endoint

#### endpoint
endpoints return a specific interface depending either the request is handled by the content app or the api one

##### html page answerer (**_current**)
exposes an object with the following properties :
* **id**, used to provides specific page provisioning and rendering behaviours
* **_provisionner**, return a `props => new Promise((resolve, reject) => {})` interface to handle the request

if no endpoint is provided, an 404 html page will be returned

##### specific method answerer (**_methods**)
exposes a `req => new Promise((resolve, reject) => {})` interface to handle the request

if no endpoint is provided, a JSON error description will be returned with its status code to 404

### implementation

#### router node
the **router node** can have some of these properties :
* a leaf (**_current**),
* a bunch of leaves (**_methods_**),
* a bunch of branches (with :
  * **_lowers**
  * **_params**)

#### files structure
following file organization is enforced by the pattern
```
{ node-folder }
  +-- _current
  |   +-- _provisioner
  |   |   +-- _provisioner.js
  |   +-- _current.js
  +-- _lowers
  |   +-- 'key': < node-folder >..*
  |   +-- index.js
  +-- _params
  |   +-- 'key': ..*
  |   |   +-- _provisioner
  |   |   |   +-- _provisioner.js
  |   |   +-- 'key'.js
  |   +-- index.js
  +-- _methods
  |   +-- 'key':  ..*
  |   |   +-- 'key'.js
  |   +-- index.js
  +-- < node-file > (index)
```

**information shown below can be OBSOLETE**

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

## dialogs

### logic
a dialog is a succession of **scenes**

**scenes** display content and can output server-side actions. They usually can be browsed through the **Back** & **Next** buttons

each given dialog get its own temporary state variables :
* **scope**, UI or form validation data,
* **form**, data to be sent at some point in the dialog

these variables are historized

these variables also can be used in the `_eval` methods: **evalStatic** and **evalClick**, in addition to the contextual given props

**user change re-initializes dialog history**

#### openDialog pipeline
dialog is opened by calling the global function `window.__METHODS__.openDialog(type[, id[, options]])`

given the function's parameters, the `<DialogModal/>` will be rendered with a processed dialog variable

obtaining this processed variable is achieved through the following two steps :
1. **_sourceGetters**, where dialog data is provisioned
2. **_dialogBuilders**, where data is processed in order to meet the `<DialogModal/>`'s **dialog property** requirements

specific step behaviour is arranged according to the `type` param, which accepts the following value :
* **'main'**
* **'previous'**
* **'extract'**, requires the `id` param
* **'event'**, requires the `id` param
* **'dom'**, requires the `id` param

#### history & 'previous'
whenever a dialog is opened, it creates an entry in the history

changing scene, scope or form is saved in the history entry

### component

### dialog object input specification
what's expected from the inputed `<DialogModal/>`'s dialog prop

target format can be obtained through the `_dialogBuilders` step

```javascript
const dialog = {
    _id: 'string',
    extracts: ['<extractId>: ObjectId'], // optional, used in introduction, when the KOLO-SEED shell isn't available
    scenes: {
        first: '<sceneId>: string',
        pages: [ // index gives the current page displayed in the dialog title
            ['<sceneId>: string'] ], // matching scene ids
        list: {
            ['<sceneId>: string']: '<scene>'
        }
    },
    '<lang>': {
        dialog: {
            title
        },
        scenes: {
            '<sceneId>: string': '<langScene>'
        }
    },
    main: false || true // if true, dialog will be opened when the user auth
}

const scene = {
    extracts: ['<extractId>: string'], // extracts has to be required through dialog.extracts property
    menu: {
        order: ['<optionId>: string'],
        list: {
            ['<optionIdd>: string']: '<menuItem>'
        },
    back: '<menuItem>',
    back2: '<menuItem>', // requires 'back' to be first set in order to be displayed
    next: '<menuItem>',
    next2: '<menuItem>'  // requires 'next' to be first set in order to be displayed
}

const menuItem = {
    hidden: false || true || 'evaluable code for exposed dialog API',
    disabled: false || true || 'evaluable code ...',
    valid: false || true || 'evaluable code ...',
    click: 'evaluable code'
}

const langScene = {
    content: '<markdown>: string',
    summary: 'evaluable code , for templating',
    menu: {
        label: 'evaluable code ...'
    },
    back: {
        label: 'evaluable code ...'
    },
    next: {
        label: 'evaluable code ...'
    }
}
```

## DOMS

### no TRIGHBS

#### ong-cite embryo
**restricted to the `'maturing kolo-seed'` dialog**

##### behaviour
* **[empty rooms].quantity > 0**, no interaction
* **[empty rooms].quantity === 0**, displays the "release" button
  * if confirmed, go to the next `'wandering kolo-seed'` dialog

#### re-hydrated ong-cite embryo
**restricted to the `'wandering kolo-seed'` & `'installed kolo-seed'` dialogs**

##### behaviour
* `'wandering kolo-seed'`, no interaction
* `'installed kolo-seed'`, displays the "start" button
  * if confirmed, go to the next `'starting ong-cite'` dialog

#### empty rooms
**restricted to the `'maturing kolo-seed'` dialog**

##### properties
* **dialogs**
  * "fill room", choose **TRIGHBS** or access presentation event dialog
 
* **quantity** (number of empty rooms)
  * initialized with 3
  * in the `'maturing kolo-seed'` step, choosing a **TRIGHB RAYÖN** will reduce the quantity by 1
  * at 0, removes the **DOMS** from `user.data.home` and allows the **ong-cite embryo** to be released

##### behaviour
* displays the "fill room" button which open the "fill room" dialog
* "fill room" dialog allows:
  * direct **TRIGHB** selection
  * **TRIGHB**-related event dialog opening

### ARKEOS

#### kolo-seed shell

##### properties
* **extracts**, contains extract references
  * when validating user (first user data provisioning), randomly pick up 2 extracts about each of the 5 following concepts: **FRAST**, **HOL-ONG**, **ZUMS**, **TRIGHBS**, **KOLO-SEED**
  * at the `'introduction'` dialog validation, when the **kolo-seed shell** is added, this random extracts are bound to it

### SPARKERS

#### sparkers rayon

#### photo-cells

### NOVS

#### novs rayon

#### rangers body

### MIKORIS

#### mikoris rayon

### GRANOS

#### granos rayon

#### granos silo

#### sow calendar

### LISTERS

#### listers rayon

#### persistent list column

#### list tag observatory
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

## lexicon

### app
an app is server-side. It receives delegation of a route logic part in `functions/index.js`
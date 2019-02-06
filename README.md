# perma-data-4

## functions, server apps
two apps are imported in the `functions/index.js` file :
* api (from `./apps/api`), for client-side queries
* content (from `./apps/content`), for page server-side rendering
access to these apps is set in the `firebase.json` file such as :
```javascript
"rewrites": [
  {
    "source": "/api/**",
    "function": "api"
  },
  {
    "source": "**",
    "function": "content"
  }
]
```
this waterfall pattern first match the *api*-specific url,
and, if it doesn't, send the request to the *content* app
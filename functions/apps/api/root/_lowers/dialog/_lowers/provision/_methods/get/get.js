const _endpoints = require('./_endpoints')

module.exports = req => 
  new Promise((resolve, reject) => {
    const { query } = req
    const { key } = query
    if (!key) {
      reject({
        status: '400',
        title: 'no key provided' ,
        message: 'dialog provisioning requires a "key" to match a pipeline'
      })
    } else if (!_endpoints[key]) {
      reject({
        status: '404',
        title: 'no pipeline found' ,
        message: `no dialog provisioning pipeline for the key "${ key }`
      })
    }
    _endpoints[key](req)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
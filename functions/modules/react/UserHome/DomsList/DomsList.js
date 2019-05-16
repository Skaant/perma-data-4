import React from 'react'
import _data from './_data'
import TrighbItem from './TrighbItem/TrighbItem';

export default ({ doms, lang }) => {
  // domsIndex for the doms([key] => index) association
  const domsIndex = doms.reduce((domsIndex, { _id }, index) => {
    domsIndex[_id] = index
    return domsIndex
  }, {})
  const trighbsSorted = doms.reduce((trighbsSorted, dom) => {
    const data = _data[dom._id]
    const trighb = data.trighb
    // skip bolshDoms (named after trighb) to add them auto. at first related dom's appearance
    if (trighb) {
      const mergedDom = Object.assign({}, data, dom)
      if (!trighbsSorted[trighb]) {
        trighbsSorted[trighb] = {
          bolshDom: Object.assign({}, _data[trighb], doms[domsIndex[trighb]]),
          doms: []
        }
      }
      trighbsSorted[trighb].doms.push(mergedDom)
    }
    return trighbsSorted
  }, {})
  return (
    <div className='row'>
      <div className='col-12 container'>
        {
          Object.keys(trighbsSorted)
            .map(key => (
              <TrighbItem key={ key } lang={ lang }
                  { ...trighbsSorted[key] }/>
            ))
        }
      </div>
    </div>
  )
}
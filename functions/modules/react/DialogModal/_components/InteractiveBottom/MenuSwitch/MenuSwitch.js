import React from 'react'
import ExtractList from './ExtractList/ExtractList'

export default ({ item, scope, data }) => {
  if (item.provisionRequired && !data) {
    // todo add a spinner
  }
  switch (item.type) {
    case 'extract list': 
      return <ExtractList list={ data && data.list
        || scope.extracts && item.scopeData 
          && window.__STATE__.user.data.extracts.filter(extract =>
            scope.extracts[item.scopeData].includes(extract._id))
            .map(extract => extract._id)
        || [] }/>
  }
}
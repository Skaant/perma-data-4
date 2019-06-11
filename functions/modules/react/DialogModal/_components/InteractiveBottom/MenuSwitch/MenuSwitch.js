import React from 'react'
import ExtractList from './ExtractList/ExtractList'

export default ({ type, provisionRequired, data }) => {
  if (provisionRequired && !data) {
    // todo add a spinner
  }
  switch (type) {
    case 'extracts list': 
      return <ExtractList list={ data.list }/>
  }
}
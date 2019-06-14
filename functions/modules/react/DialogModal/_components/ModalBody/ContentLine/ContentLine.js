import React from 'react'
import marked from 'marked'
import LineSwitch from './LineSwitch/LineSwitch'

export default props => {
  const { line } = props
  if (typeof line === 'string') {
    return (
      <div className='row px-4'
          dangerouslySetInnerHTML={ {
            __html: marked(line)
          } }/>
    )
  // else, line is the [Int32:] index of the contentFragment reference & properties
  } else {
    const { data, contentFragments } = props
    const contentFragment = contentFragments[line]
    return (
      <LineSwitch { ...contentFragment }
          data={ contentFragment.key && data[contentFragment.key] || false }/>
    )
  }
}
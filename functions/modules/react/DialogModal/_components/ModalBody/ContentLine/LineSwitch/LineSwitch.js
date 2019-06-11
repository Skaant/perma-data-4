import React from 'react'

export default ({ type, provisionRequired, data }) => {
  if (provisionRequired && !data) {
    // todo add a spinner
  }
  switch (type) {
    default:
      return false
  }
}
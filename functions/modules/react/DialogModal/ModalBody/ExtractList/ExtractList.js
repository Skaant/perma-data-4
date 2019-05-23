import React from 'react'

export default ({ sceneExtracts, extracts }) =>
  sceneExtracts.map(extractId => (
    <div key={ extractId } className='row'>
      <p>{ extracts[extractId] }</p>
    </div>
  ))
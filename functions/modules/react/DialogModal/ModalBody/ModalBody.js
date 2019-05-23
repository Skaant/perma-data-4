import React from 'react'
import ExtractList from './ExtractList/ExtractList'
import SceneContent from './SceneContent/SceneContent'
import SceneSummary from './SceneSummary/SceneSummary'

export default ({ scene, extracts, translations }) => (
  <React.Fragment>
    <div className='modal-body container py-0'>
      {
        scene.content && (
          <SceneContent content={ scene.content }
              pictures={ scene.pictures }/>
        )
      }
      {
        scene.extracts && (
          <ExtractList sceneExtracts={ scene.extracts }
              extracts={ extracts }/>
        )
      }
      {
        scene.summary && (
          <SceneSummary summary={ scene.summary }
              translations={ translations }/>
        )
      }
    </div>
  </React.Fragment>
)
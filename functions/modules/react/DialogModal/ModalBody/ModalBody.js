import React from 'react'
import ExtractList from './ExtractList/ExtractList'
import ContentDisplay from './ContentDisplay/ContentDisplay'
import SceneSummary from './SceneSummary/SceneSummary'

export default ({ scene, extracts, lang, translations }) => (
  <React.Fragment>
    <div className='modal-body container p-4'>
      {
        scene.content && (
          <ContentDisplay content={ scene.content }
              pictures={ scene.pictures }/>
        )
      }
      {
        scene.extracts && (
          <ExtractList theme={ scene.theme }
              sceneExtracts={ scene.extracts }
              extracts={ extracts }
              translations={ translations }
              lang={ lang }/>
        )
      }
    </div>
    {
      scene.summary && (
        <SceneSummary summary={ scene.summary }
            translations={ translations }/>
      )
    }
  </React.Fragment>
)
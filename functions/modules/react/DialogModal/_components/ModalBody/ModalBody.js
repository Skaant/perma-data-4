import React from 'react'
import ContentDisplay from './ContentDisplay/ContentDisplay'
import SceneSummary from './SceneSummary/SceneSummary'
import CommentsList from './CommentsList/CommentsList'
import TopAlert from './TopAlert/TopAlert'
import ProvisionDynamics from './ProvisionDynamics/ProvisionDynamics';

export default ({ scene, translations, data }) => (
  <React.Fragment>
    <div className='modal-body container p-4'>
      {
        scene.alert && (
          <TopAlert alert={ scene.alert }/>
        )
      }
      {
        scene.content && (
          <ContentDisplay content={ scene.content }
              pictures={ scene.pictures }
              source={ scene.source }
              translations={ translations }/>
        )
      }
    </div>
    {
      data && (
        <ProvisionDynamics dialogState={ dialogState }/>
      )
    }
    {
      scene.comments && (
        <CommentsList comments={ scene.comments }
            translations={ translations }/>
      )
    }
    {
      scene.summary && (
        <SceneSummary summary={ scene.summary }
            translations={ translations }/>
      )
    }
  </React.Fragment>
)
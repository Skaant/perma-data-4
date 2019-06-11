import React from 'react'
import SceneSummary from './SceneSummary/SceneSummary'
import CommentsList from './CommentsList/CommentsList'
import TopAlert from './TopAlert/TopAlert'
import ContentLine from './ContentLine/ContentLine'

export default ({ scene, translations, provisioned, data, dialogKey }) => (
  <React.Fragment>
    <div className='modal-body container p-4'>
      {
        scene.alert && (
          <TopAlert alert={ scene.alert }/>
        )
      }
      {
        scene.source && (
          <p className='text-init small font-weight-light text-center mb-4 pb-4'>
            <span className='badge badge-secondary py-1 mr-2'>
              { translations.source }</span>
            { scene.source }</p>
        )
      }
      {
        scene.content && (
          <div className='content-display'>
            {
              scene.content.map((line, index) => (
                <ContentLine key={ `${ dialogKey }-${ index }` }
                    line={ line }
                    data={ data }
                    contentFragments={ scene.contentFragments || false }/>
              ))
            }
          </div>
        )
      }
    </div>
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
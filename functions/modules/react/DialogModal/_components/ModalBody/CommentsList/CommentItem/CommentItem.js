import React from 'react'
import marked from 'marked'

export default ({ comment }) => (
  <div className='row alert alert-info px-4 pt-4 mt-4 mx-4'>
    <h5 className='mb-3'>
      { comment.title }</h5>
    {
      comment.content && comment.content.map(line => (
        <div key={ line.slice(0, 10) }
            className='font-weight-light px-4'
            dangerouslySetInnerHTML={ {
          __html: marked(line)
        } }/>
      ))
    }
  </div>
    
)
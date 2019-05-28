import React from 'react'
import CommentItem from './CommentItem/CommentItem'

export default ({ comments, translations }) => (
  <div className='mt-4 px-4 w-100 border-top'>
    <h5 className='text-center my-3 font-weight-light text-uppercase'>
      { translations.comments }</h5>
    {
      comments.map(comment => (
        <CommentItem key={ comment.title.slice(0, 10) }
            comment={ comment }/>
      ))
    }
  </div>
)
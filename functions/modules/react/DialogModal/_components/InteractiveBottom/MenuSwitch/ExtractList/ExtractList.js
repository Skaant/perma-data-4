import React from 'react'

export default ({ list }) => {
  const extracts = window.__STATE__.user.data.extracts
  const lang = window.__PROPS__.lang
  return list.map(_id =>
    extracts.find(extract => extract._id === _id))
    .map(extract => (
      <div key={ extract._id }
          className='alert alert-info col-12 col-lg-8 my-2 border border-warning'>
        <p className='small'>
          { extract[lang].source }
          <span className='float-right'>{
            extract.tags.map(tag => (
              <span key={ tag } className='badge badge-secondary ml-1'>
                { tag }</span>
            ))
          }</span></p>
        <button type='button'
            className='btn btn-warning text-uppercase w-100 my-1 txt-white py-2'
            onClick={ () => window.__METHODS__.openDialog('extract', extract._id) }>
          { extract[lang].title }</button>
      </div>
    ))
}
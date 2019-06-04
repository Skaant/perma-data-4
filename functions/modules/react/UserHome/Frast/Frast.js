import React from 'react'

export default ({ translations }) => (
  <div className='container'>
    <div className='row p-4 text-center'>
      <h1 className='col-12' style={ {
          fontFamily: 'dayRoman' } }>
        { translations.welcome['frast'] }</h1>
    </div>
    <div className='row'>
      <img className='col-12'
          src='https://firebasestorage.googleapis.com/v0/b/perma-data-4.appspot.com/o/pages%2Fhome%2Ffrast%20overlook.png?alt=media&token=e0acbd08-1ac4-4c45-a26a-b351e73c25c3'/>
    </div>
    <div className='row p-4 text-center'>
      <p className='col-12'>
        { translations.introduction }</p>
    </div>
  </div>
)
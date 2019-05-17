import React from 'react'
import DomsList from './DomsList/DomsList'

export default ({
  user: {
    data: {
      pseudo,
      home
    }
  }, lang }) => {
  return (
    <React.Fragment>
      <div className='row'>
        <h2 className='col-12 my-4'>
          Salut { pseudo } !</h2>
      </div>
      <DomsList doms={ home.doms } lang={ lang }/>
    </React.Fragment>
  )
}
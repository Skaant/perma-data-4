import React from 'react'
import EventItem from './EventItem/EventItem'

export default ({ events, translations }) => {
  return (
    <div className='jumbotron bg-white py-4'>
      <div className='row pb-2'>
        <h2 className='col-12 text-center text-uppercase font-weight-light mt-4'>
          { translations.events }</h2>
      </div>
      <div className='row'>
        {
          events.map(event => (
            <EventItem key={ event._id }
                event={ event }/>
          ))
        }
      </div>
    </div>
  )
}
import React from 'react'

export default ({ events, translations }) => (
  <div className='jumbotron bg-white'>
    <div className='row pb-2'>
      <h2 className='col-12 text-center text-uppercase font-weight-light'>
        { translations.events }</h2>
    </div>
    {
      (new Array(Math.round(events.length / 3 + (events.length%3 ? 1 : 0))))
        .map(index => (
          <div key={ index } className='row card-deck mb-3'>
            {
              events.slice(index * 3, index * 3 + 3)
                .map(event => (
                  <div key={ event._id }
                      className='card'>
                    { event[window.__PROPS__.lang].title }</div>))
            }
          </div>)) 
    }
  </div>
)
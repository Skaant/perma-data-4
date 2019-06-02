import React from 'react'
import Context from './Context/Context'
import EventsList from './EventsList/EventsList'
import DomsList from './DomsList/DomsList'

export default ({
  context,
  doms, events,
  translations
}) => (
  <React.Fragment>
    <Context context={ context }
        translations={ translations }/>
    <EventsList events={ events }
        translations={ translations }/>
    <DomsList doms={ doms }/>
  </React.Fragment>
)
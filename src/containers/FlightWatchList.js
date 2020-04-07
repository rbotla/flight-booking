import React from 'react';
import FlightCard from '../components/FlightCard'

const FlightWatchList = props => (
  <div style={props.style}>
    {
      props.flights.map( f => <FlightCard flight={f} removeFromWatchList={props.removeFromWatchList} type="watch"/>)
    }
  </div>
)

export default FlightWatchList;
import React from 'react';
import FlightCard from '../components/FlightCard'

const FlightSearchResults = props => (
  <div style={props.style}> 
    {
      props.flights.map( f => <FlightCard flight={f} addToWatchList={props.addToWatchList}/>)
    }
  </div>
)

export default FlightSearchResults;
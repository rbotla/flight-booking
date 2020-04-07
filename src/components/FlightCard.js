import React from 'react';

const FlightCard = props => (
  <div className="w3-card-4">
    <header className="w3-container w3-light-grey">
      <h3>{props.flight.Carrier}</h3>
    </header>

    <div className="w3-container">
      {
      props.type ? null: <img src="https://www.shareicon.net/data/256x256/2015/09/18/642524_airport_512x512.png" alt="Avatar" class="w3-left w3-circle" />
      }
      <p>Stops: {props.flight.Direct}</p>
      <p>Price: ${props.flight.Price}</p>
    </div>

    {
    props.type ? <button className="w3-button w3-block w3-dark-grey" onClick={() => props.removeFromWatchList(props.flight)}>- Remove</button>
    : <button className="w3-button w3-block w3-dark-grey" onClick={() => props.addToWatchList(props.flight)}>+ Add</button>
    }
  </div>
);

export default FlightCard;
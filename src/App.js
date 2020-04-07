import React from 'react';
import axios from 'axios';
import FligthSearch from './containers/FlightSearch';

import './App.css';

class App extends React.Component {
  state = {
    flights: []
  }
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(from, to, date) {
    const that = this;
    //event.preventDefault();
    const dateString = new Date(date).toISOString().split('T')[0]
    axios.get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${from}-sky/${to}-sky/${dateString}?x-rapidapi-host=skyscanner-skyscanner-flight-search-v1.p.rapidapi.com&=`,
      {
        headers: {
          'x-rapidapi-key': '102097f295msh274cd06f41845c9p1754adjsn97f897b9d136',
          'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
        }
      }
    )
    .then ((response) => {
      console.log(response);
      this.setState({flights: response.data.Quotes})
    })
    .catch(error => {
      alert('Error gettting information ', error)
    })
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          Flight Booking App
        </header>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <FligthSearch style={{flex: 1}} handleSearch={this.handleSearch}/>
          <FlightSearchResults style={{flex: 2}} flights={this.state.flights}/>
          <FlightWatchList style={{flex: 1, backgroundColor: "green"}}/>
        </div>
      </div>
    );
  }
}

const FlightSearchResults = props => (
  <div style={props.style}> 
    {
      props.flights.map( f => <FlightCard flight={f} />)
    }
  </div>
)

const FlightCard = props => (
  <div style={props.style}>
    <div>{props.flight.OutboundLeg.CarrierIds[0]}</div>
  </div>
);


const FlightWatchList = props => (
  <div style={props.style}>
    Watch list
  </div>
)

export default App;

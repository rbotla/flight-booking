import React from 'react';
import axios from 'axios';
import FligthSearch from './containers/FlightSearch';
import FlightCard from './components/FlightCard';
import FlightSearchResults from './containers/FlightSearchResults';
import FlightWatchList from './containers/FlightWatchList';

import './App.css';

class App extends React.Component {
  state = {
    flights: [],
    watchList: []
  }
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.addToWatchList=this.addToWatchList.bind(this);
    this.removeFromWatchList=this.removeFromWatchList.bind(this);
  }

  removeFromWatchList(flight) {
    console.log(flight)
    const newList = this.state.watchList.filter(f => f.Id !== flight.Id)
    console.log(this.state.watchList.length, newList.length)
    this.setState({watchList: newList});
  }

  addToWatchList(flight) {
    const newList = [...this.state.watchList, flight];
    this.setState({watchList: newList});
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
      const Carriers = response.data.Carriers
      const findCarrierName = c => Carriers.find(x => c == x.CarrierId).Name  
      const flights = response.data.Quotes.map(q => {
        return {
          Id: q.QuoteId,
          Price: q.MinPrice,
          Direct: q.Direct ? 'Direct Flight' : 'No Direct Flight',
          Carrier: q.OutboundLeg.CarrierIds.map(c => findCarrierName(c)),
          FlyDate: q.DepartureDate
        }
      })
  
      this.setState({flights: flights})
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
          <div style={{flex: 2}} >
            <h3>Search Results</h3>
            <FlightSearchResults flights={this.state.flights} addToWatchList={this.addToWatchList}/>
          </div>
          <div style={{flex: 1, marginLeft: "5px"}} >
          <h3>Watch List</h3>
            <FlightWatchList style={{flex: 1}} flights={this.state.watchList} removeFromWatchList={this.removeFromWatchList}/>
          </div>
        </div>
      </div>
    );
  }
}



export default App;

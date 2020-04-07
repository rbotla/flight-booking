import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
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
          <FlightSearch style={{flex: 1}} handleSearch={this.handleSearch}/>
          <FlightSearchResults style={{flex: 2, backgroundColor: "yellow"}}/>
          <FlightWatchList style={{flex: 1, backgroundColor: "green"}}/>
        </div>
      </div>
    );
  }
}

class FlightSearch extends React.Component {    
  state = {
    from: '',
    to: '',
    date: ''
  }

  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({[name]: val});
  }

  render() {
    return (
      <div className="form" style={this.props.style}>
            <form onSubmit={() => this.props.handleSearch(this.state.from, this.state.to, this.state.date) }>
              <label htmlFor="from">From</label>
              <input type="text" id="from" name="from" placeholder="From.." onChange={this.handleChange}  value={this.state.from}/>
              <label htmlFor="from">To</label>
              <input type="text" id="to" name="to" placeholder="To.." onChange={this.handleChange}  value={this.state.to}/>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" onChange={this.handleChange}  value={this.state.date}/>

              <input type="submit" value="Submit" />
            </form>
      </div>
    )
  }
}

const FlightCard = props => (
  <div style={props.style}>
    {props.name}
  </div>
);

const FlightSearchResults = props => (
  <div style={props.style}>
    results
  </div>
)

const FlightWatchList = props => (
  <div style={props.style}>
    Watch list
  </div>
)

export default App;

import React from 'react';

class FlightSearch extends React.Component {    
  state = {
    from: '',
    to: '',
    date: ''
  }

  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({[name]: val});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.from, this.state.to, this.state.date);
  }

  render() {
    return (
      <div className="form" style={this.props.style}>
            <form onSubmit={this.handleSubmit}>
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

export default FlightSearch;
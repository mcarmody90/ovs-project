import React, { Component } from 'react';
import master from '../data/master';

export class Navbar extends Component {
  state = {
    WellID: 'Select a well',
    dateRange: 365
  }
  getText = (e) => {
    const WellID = e.target.innerHTML;
    this.setState({
      WellID
    });
    this.props.wellChange(WellID);
  }
  onDateChange = (e) => {
    const dateRange = e.target.innerHTML;
    this.setState({
      dateRange
    });
    this.props.dateChange(dateRange);
  }
  render() {
    return (
      <div className="navbar_component">
        <div className="dropdown">
          <button className="well-btn btn btn-lg btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
            {this.state.WellID}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
              master.map((well) => (
                <a onClick={this.getText} className="dropdown-item" href="#" key={well.WellID}>{well.WellID}</a>
              ))
            }
          </div>
          <button onClick={this.onDateChange}>3M</button>
          <button onClick={this.onDateChange}>6M</button>
          <button onClick={this.onDateChange}>1Y</button>
          <button onClick={this.onDateChange}>3Y</button>
          <button onClick={this.onDateChange}>5Y</button>
        </div>
      </div>
    )
  }
}

export default Navbar

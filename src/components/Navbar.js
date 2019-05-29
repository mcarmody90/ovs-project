import React, { Component } from 'react';
import master from '../data/master';

export class Navbar extends Component {
  state = {
    WellID: 'Select a well'
  }
  getText = (e) => {
    const WellID = e.target.innerHTML;
    this.setState({
      WellID
    });
    this.props.wellChange(WellID);
  }
  render() {
    return (
      <div className="navbar_component">
        <div className="dropdown">
          <button className="btn btn-lg btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
            {this.state.WellID}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
              master.map((well) => (
                <a onClick={this.getText} className="dropdown-item" href="#" key={well.WellID}>{well.WellID}</a>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar

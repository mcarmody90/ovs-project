import React, { Component } from 'react';
import master from '../data/master';

export class WellInfo extends Component {
  state = {
    WellID: this.props.WellID,
    well: {}
  }
  componentDidUpdate(prevProps) {
    if(this.props.WellID !== prevProps.WellID){
      const well = master.filter(obj => {
        return obj.WellID === this.props.WellID
      })
      this.setState({
        WellID: this.props.WellID,
        well
      })
    }
  }
  render() {
    return (
      this.state.WellID.length > 0 ? (
        (
          <div className="text-left">
            <h1>{this.props.WellID}</h1>
            <h4>Area: {this.state.well[0].Area}</h4>
            <h4>SubArea: {this.state.well[0].SubArea}</h4>
            <h4>County: {this.state.well[0].County}</h4>
            <h4>State: {this.state.well[0].State}</h4>
            <h4>Operator: {this.state.well[0].Operator}</h4>
            <h4>Lease: {this.state.well[0].Lease}</h4>
          </div>
        )
      ) : (
        <h1>No Well Selected</h1>
    )
    )
  }
}

export default WellInfo

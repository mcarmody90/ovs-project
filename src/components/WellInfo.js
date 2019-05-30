import React, { Component } from 'react';
import axios from 'axios';
import master from '../data/master';

export class WellInfo extends Component {
  state = {
    WellID: this.props.WellID,
    well: {},
    alarms: []
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
      axios.get(`http://localhost:3000/wellTest?WellID=${this.props.WellID}&_sort=Date&_order=desc`, false)
      .then(res => this.setState({
        alarms: res.data[0]
      }))
    }
  }
  render() {
    console.log(this.state);
    return (
      this.state.WellID.length > 0 ? (
        (
          <div className="well-info text-left">
            <div>
              <h1 className="text-center">{this.props.WellID}</h1>
              <hr />
              <h5>Area: {this.state.well[0].Area}</h5>
              <h5>SubArea: {this.state.well[0].SubArea}</h5>
              <h5>County: {this.state.well[0].County}</h5>
              <h5>State: {this.state.well[0].State}</h5>
              <h5>Operator: {this.state.well[0].Operator}</h5>
              <h5>Lease: {this.state.well[0].Lease}</h5>
              <h5>First Production: {this.state.alarms.DateOriginal}</h5>
            </div>
            <div>
              <h1 className="text-center">Alarms</h1>
              <hr />
              <h5>GOR: {this.state.alarms.GOR}</h5>
            </div>
          </div>
        )
      ) : (
        <h1>No Well Selected</h1>
    )
    )
  }
}

export default WellInfo

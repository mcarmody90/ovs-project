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
    return (
      this.state.WellID.length > 0 ? (
        (
          <div className="well-info text-center">
            <div>
              <h1>{this.props.WellID}</h1>
              <hr />
              <table className="table table-striped table-sm text-left mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Area</th>
                    <td>{this.state.well[0].Area}</td>
                  </tr>
                  <tr>
                    <th scope="row">SubArea</th>
                    <td>{this.state.well[0].SubArea}</td>
                  </tr>
                  <tr>
                    <th scope="row">County</th>
                    <td>{this.state.well[0].County}</td>
                  </tr>
                  <tr>
                    <th scope="row">State</th>
                    <td>{this.state.well[0].State}</td>
                  </tr>
                  <tr>
                    <th scope="row">Operator</th>
                    <td>{this.state.well[0].Operator}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lease</th>
                    <td>{this.state.well[0].Lease}</td>
                  </tr>
                  <tr>
                    <th scope="row">First Production</th>
                    <td>{this.state.alarms.DateOriginal}</td>
                  </tr>
                </tbody>
              </table>
              <button type="button" className="btn btn-secondary btn-sm btn-block mt-0 mb-3" data-toggle="modal" data-target="#wellInfoModal">More</button>
            
              <div className="modal fade" id="wellInfoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h1 className="text-center">{this.props.WellID}</h1>
                      <table className="table table-striped table-sm">
                        <tbody>
                          <tr>
                            <th scope="row">Well</th>
                            <td>{this.state.well[0].Well}</td>
                          </tr>
                          <tr>
                            <th scope="row">Name</th>
                            <td>{this.state.well[0].Name}</td>
                          </tr>
                          <tr>
                            <th scope="row">CompDate</th>
                            <td>{this.state.well[0].CompDate}</td>
                          </tr>
                          <tr>
                            <th scope="row">KBE</th>
                            <td>{this.state.well[0].KBE}</td>
                          </tr>
                          <tr>
                            <th scope="row">TD</th>
                            <td>{this.state.well[0].TD}</td>
                          </tr>
                          <tr>
                            <th scope="row">Reservoir</th>
                            <td>{this.state.well[0].Reservoir}</td>
                          </tr>
                          <tr>
                            <th scope="row">PVTRegion</th>
                            <td>{this.state.well[0].PVTRegion}</td>
                          </tr>
                          <tr>
                            <th scope="row">Category</th>
                            <td>{this.state.well[0].Category}</td>
                          </tr>
                          <tr>
                            <th scope="row">FlowStation</th>
                            <td>{this.state.well[0].FlowStation}</td>
                          </tr>
                          <tr>
                            <th scope="row">Function</th>
                            <td>{this.state.well[0].Function}</td>
                          </tr>
                          <tr>
                            <th scope="row">Method</th>
                            <td>{this.state.well[0].Method}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div>
              <h1>Alarms</h1>
              <hr />
              <h5>GOR: {this.state.alarms.GOR}</h5>
              <h5>Oil Rate: {this.state.alarms['Oil Rate']}</h5>
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

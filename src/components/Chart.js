import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class Chart extends Component {
  state = {
    WellID: this.props.WellID,
    dateRange: 365,
    oil: [],
    water: [],
    gas: [],
    choke: 0
  }
  componentDidUpdate(prevProps) {
    if(this.props.WellID !== prevProps.WellID || this.props.dateRange !== prevProps.dateRange){
      this.setState({
        WellID: this.props.WellID
      })
      axios.get(`http://localhost:3000/Daily_Prod?WellID=${this.props.WellID}&_sort=Date&_order=desc&_limit=${this.props.dateRange}`, false)
      .then(res => this.setState({
        oil: res.data.map(a => a.Oil),
        water: res.data.map(a => a.Water),
        gas: res.data.map(a => a.Gas)
      })).then(
        axios.get(`http://localhost:3000/wellTest?WellID=${this.props.WellID}&_sort=Date&_order=desc&_limit=${this.props.dateRange}`, false)
        .then(res => this.setState({
          choke: res.data[0]['Choke']
        }))
      )
    }
  }
  render() {
    const oil = this.state.oil.map(function (x) {
      return parseFloat(x);
    });
    const water = this.state.water.map(function (x) {
      return parseFloat(x);
    });
    const gas = this.state.gas.map(function (x) {
      return parseFloat(x);
    })
    const last_water_element = water[0];
    const last_gas_element = gas[0];
    return (
      <div>
        <div className="main_chart border">
          <h1>{this.props.WellID}</h1>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: `${this.state.WellID} Daily Production`
              },
              credits: {
                enabled: false
              },
              series: [
                {
                  name: 'Water',
                  data: water,
                  yAxis: 1
                },
                {
                  name: 'Oil',
                  data: oil
                },
                {
                  name: 'Gas',
                  data: gas
                }
              ],
              xAxis: [
                {
                  reversed: true
                }
              ],
              yAxis: [
                {
                  lineWidth: 1,
                  title: {
                    text: 'Gas Rate'
                  }
                },
                {
                  lineWidth: 1,
                  opposite: true,
                  title: {
                    text: 'Water Rate'
                  }
                }
              ],
              plotOptions: {
                series: {
                  marker: {
                    enabled: false
                  }
                }
              }
            }}
          />
        </div>
        <div className="row border sub_chart--container">
          <div className="sub_chart border bg-danger text-white">
            <h3>Gas Rate  <i className="material-icons md-48">trending_up</i></h3>
            <h5>{last_gas_element} (Mscf/d) </h5>
          </div>
          <div className="sub_chart border bg-primary text-white">
            <h3>Water Rate</h3>
            <h5>{last_water_element} (bbls/d)</h5>
          </div>
          <div className="sub_chart border bg-secondary text-white">
            <h3>Choke</h3>
            <h5>{this.state.choke} (1/64 in)</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default Chart

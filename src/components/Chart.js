import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class Chart extends Component {
  state = {
    WellID: this.props.WellID,
    oil: [],
    water: [],
    gas: []
  }
  componentDidUpdate(prevProps) {
    if(this.props.WellID !== prevProps.WellID){
      this.setState({
        WellID: this.props.WellID
      })
      axios.get(`http://localhost:3000/Daily_Prod?WellID=${this.props.WellID}&_limit=365`, false)
      .then(res => this.setState({
        oil: res.data.map(a => a.Oil),
        water: res.data.map(a => a.Water),
        gas: res.data.map(a => a.Gas)
      }))
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
    const last_oil_element = oil[oil.length - 1];
    const last_water_element = water[water.length - 1];
    const last_gas_element = gas[gas.length - 1];
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
              ]
            }}
          />
        </div>
        <div className="row border sub_chart--container">
          <div className="sub_chart border">
            <h1>Gas Rate</h1>
            <h5>{last_gas_element}</h5>
          </div>
          <div className="sub_chart border">
            <h1>Water Rate</h1>
            <h5>{last_water_element}</h5>
          </div>
          <div className="sub_chart border">
            <h1>Oil Rate</h1>
            <h5>{last_oil_element}</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default Chart

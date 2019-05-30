import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class Chart extends Component {
  state = {
    WellID: this.props.WellID,
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    dateRange: 365,
    oil: [],
    water: [],
    gas: [],
    date: [],
    choke: 0,
    events: [],
    backgroundColor: '',
    textColor: ''
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
        gas: res.data.map(a => a.Gas),
        date: res.data.map(a => a.Date)
      })).then(
        axios.get(`http://localhost:3000/wellTest?WellID=${this.props.WellID}&_sort=Date&_order=desc&_limit=${this.props.dateRange}`, false)
        .then(res => this.setState({
          choke: res.data[0]['Choke']
        }))
      ).then(
        axios.get(`http://localhost:3000/Events?WellID=${this.props.WellID}&_sort=Date&_order=desc&_limit=${this.props.dateRange}`, false)
        .then(res => this.props.getEvents(res.data)
        )
      )
    } else if(this.props.startDate !== prevProps.startDate || this.props.endDate !== prevProps.endDate) {
      this.setState({
        startDate: this.props.startDate,
        endDate: this.props.endDate
      })
      axios.get(`http://localhost:3000/Daily_Prod?WellID=MO-25&_&Date_gte=${this.props.startDate}T00:00:00&Date_lte=${this.props.endDate}T00:00:00&_sort=Date&_order=desc`, false)
      .then(res => this.setState({
        oil: res.data.map(a => a.Oil),
        water: res.data.map(a => a.Water),
        gas: res.data.map(a => a.Gas),
        date: res.data.map(a => a.Date)
      }))
    }
  }
  setTheme = () => {
    this.setState({
      backgroundColor: '#044b73',
      textColor: '#E0E0E3'
    })
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
    let options = {
      chart: {
        backgroundColor: this.state.backgroundColor,
        renderTo: 'container',
        defaultSeriesType: 'line',
        zoomType: 'xy',
        margin: [50, 70, 80, 70],
        height: 600,
        style: {
          fontFamily: 'sans-serif',
          fontSize: '15px'
        }
      },
      title: {
        style: {
          fontSize: '36px',
          color: this.state.textColor
        },
        text: `${this.state.WellID} Daily Production`
      },
      legend: {
        itemStyle: {
          color: this.state.textColor
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Water',
          data: water,
          color: '#007bff',
          yAxis: 1
        },
        {
          name: 'Oil',
          data: oil,
          color: '#909090'
        },
        {
          name: 'Gas',
          data: gas,
          color: '#dc3545'
        }
      ],
      xAxis: [
        {
          visible: false,
          labels: {
            style: {
              color: this.state.textColor
            }
          },
          reversed: true,
          style: {
            color: this.state.textColor
          }
        },
      ],
      yAxis: [
        {
          labels: {
            style: {
              color: this.state.textColor,
            }
          },
          lineWidth: 1,
          title: {
            text: 'Gas Rate',
            style: {
              color: this.state.textColor
            }
          }
        },
        {
          lineWidth: 1,
          opposite: true,
          labels: {
            style: {
              color: this.state.textColor
            }
          },
          title: {
            text: 'Water Rate',
            style: {
              color: this.state.textColor,
              fontSize: '15px'
            }
          }
        }
      ],
      plotOptions: {
        series: {
          lineWidth: 2,
          marker: {
            enabled: false
          }
        }
      }
    }
    let gasTrend = gas[1] <= gas[0] ? 'trending_up' : 'trending_down';
    let waterTrend = water[1] <= water[0] ? 'trending_up' : 'trending_down';
    if(this.state.WellID.length > 0) {
    return (
      <div>
        <button className="btn btn-block btn-secondary" onClick={this.setTheme}>Darken</button>
        <div className="main_chart">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
        <div className="row sub_chart--container">
          <div className="sub_chart bg-danger text-white">
            <h3>Gas Rate  <i className="material-icons" style={{fontSize: '36px'}}> {gasTrend}</i></h3>
            <h5>{parseFloat(gas[0]).toFixed(2)} (Mscf/d) </h5>
          </div>
          <div className="sub_chart bg-primary text-white">
            <h3>Water Rate  <i className="material-icons" style={{fontSize: '36px'}}> {waterTrend}</i></h3>
            <h5>{parseFloat(water[0]).toFixed(2)} (bbls/d)</h5>
          </div>
          <div className="sub_chart bg-secondary text-white">
            <h3>Choke</h3>
            <h5>{this.state.choke} (1/64 in)</h5>
          </div>
        </div>
      </div>
    )
    } else {
      return <h1>No well selected</h1>
    }
  }
}

export default Chart

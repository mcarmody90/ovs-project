import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

Highcharts.theme = {
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
      backgroundColor: '#044b73',
      style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
  },
  title: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
      }
  },
  subtitle: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
      }
  },
  xAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
          style: {
              color: '#A0A0A3'

          }
      }
  },
  yAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
          style: {
              color: '#A0A0A3'
          }
      }
  },
  tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
          color: '#F0F0F0'
      }
  },
  plotOptions: {
      series: {
          dataLabels: {
              color: '#B0B0B3'
          },
          marker: {
              lineColor: '#333'
          }
      },
      boxplot: {
          fillColor: '#505053'
      },
      candlestick: {
          lineColor: 'white'
      },
      errorbar: {
          color: 'white'
      }
  },
  legend: {
      itemStyle: {
          color: '#E0E0E3'
      },
      itemHoverStyle: {
          color: '#FFF'
      },
      itemHiddenStyle: {
          color: '#606063'
      }
  },
  credits: {
      style: {
          color: '#666'
      }
  },
  labels: {
      style: {
          color: '#707073'
      }
  },

  drilldown: {
      activeAxisLabelStyle: {
          color: '#F0F0F3'
      },
      activeDataLabelStyle: {
          color: '#F0F0F3'
      }
  },

  navigation: {
      buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
              fill: '#505053'
          }
      }
  },

  // scroll charts
  rangeSelector: {
      buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
              color: '#CCC'
          },
          states: {
              hover: {
                  fill: '#707073',
                  stroke: '#000000',
                  style: {
                      color: 'white'
                  }
              },
              select: {
                  fill: '#000003',
                  stroke: '#000000',
                  style: {
                      color: 'white'
                  }
              }
          }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
      },
      labelStyle: {
          color: 'silver'
      }
  },

  navigator: {
      handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
      },
      xAxis: {
          gridLineColor: '#505053'
      }
  },

  scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
  },

  // special colors for some of the
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: '#044b73',
  dataLabelsColor: '#B0B0B3',
  textColor: '#C0C0C0',
  contrastTextColor: '#F0F0F3',
  maskColor: 'rgba(255,255,255,0.3)'
};
Highcharts.setOptions(Highcharts.theme);


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
    events: []
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
        .then(res => this.setState({
          events: res.data.map(a => a.Date)
        }))
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
    const events = this.state.events.map(function (x) {
      return parseFloat(x);
    })
    let gasTrend = gas[1] <= gas[0] ? 'trending_up' : 'trending_down';
    let waterTrend = water[1] <= water[0] ? 'trending_up' : 'trending_down';
    if(this.state.WellID.length > 0) {
    return (
      <div>
        <div className="main_chart">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                renderTo: 'container',
                defaultSeriesType: 'line',
                zoomType: 'xy',
                margin: [50, 70, 80, 70],
                height: 600,
              },
              title: {
                style: {
                  fontSize: '36px'
                },
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
                },
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
                  lineWidth: 2,
                  marker: {
                    enabled: false
                  }
                }
              }
            }}
          />
        </div>
        <div className="row sub_chart--container">
          <div className="sub_chart bg-danger text-white">
            <h3>Gas Rate  <i className="material-icons" style={{fontSize: '36px'}}> {gasTrend}</i></h3>
            <h5>{gas[0]} (Mscf/d) </h5>
          </div>
          <div className="sub_chart bg-primary text-white">
            <h3>Water Rate  <i className="material-icons" style={{fontSize: '36px'}}> {waterTrend}</i></h3>
            <h5>{water[0]} (bbls/d)</h5>
          </div>
          <div className="sub_chart bg-secondary text-white">
            <h3>Choke</h3>
            <h5>{this.state.choke} (1/64 in)</h5>
          </div>
        </div>
      </div>
    )
    } else {
      return <h1></h1>
    }
  }
}

export default Chart

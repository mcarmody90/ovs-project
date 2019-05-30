import React from 'react';
import WellInfo from './components/WellInfo';
import Navbar from './components/Navbar';
import moment from 'moment';
import Chart from './components/Chart';
import Todo from './components/Todo';
import './App.css';

class App extends React.Component {
  state = {
    WellID: '',
    dateRange: 365,
    startDate: '',
    endDate: ''
  }
  wellChange = (WellID) => {
    this.setState({
      WellID
    })
  }
  dateChange = (date) => {
    let dateRange;
    switch(date) {
      case '3M':
        dateRange = 90;
        break;
      case '6M':
        dateRange = 180;
        break;
      case '1Y':
        dateRange = 365;
        break;
      case '3Y':
        dateRange = 1095;
        break;
      case '5Y':
        dateRange = 1825;
        break;
      default:
        dateRange = 365;
    }
    this.setState({
      dateRange
    })
  }
  getStartDate = (startDate) => {
    this.setState({
      startDate: (moment(startDate).format("YYYY-DD-MM"))
    })
  }
  getEndDate = (endDate) => {
    this.setState({
      endDate: (moment(endDate).format("YYYY-DD-MM"))
    })
  }
  render() {
    return (
      <div className="App">
        <Navbar 
          wellChange={this.wellChange} 
          dateChange={this.dateChange} 
          getStartDate={this.getStartDate} 
          getEndDate={this.getEndDate}
        />
        <div className="row">
          <div className="col-xl-2 col-lg-3">
            <WellInfo WellID={this.state.WellID} />
          </div>
          <div className="col-xl-8 col-lg-6 chart-container">
          <Chart 
            WellID={this.state.WellID} 
            dateRange={this.state.dateRange}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
          </div>
          <div className="col-xl-2 col-lg-3 col-md-12">
          <Todo />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

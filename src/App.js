import React from 'react';
import WellInfo from './components/WellInfo';
import Navbar from './components/Navbar';
import Chart from './components/Chart';
import Todo from './components/Todo';
import './App.css';

class App extends React.Component {
  state = {
    WellID: '',
    dateRange: 365
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
    }
    this.setState({
      dateRange
    })
    console.log(dateRange);
  }
  render() {
    return (
      <div className="App">
        <Navbar wellChange={this.wellChange} dateChange={this.dateChange} />
        <div className="row">
          <div className="col-lg-2 border">
            <WellInfo WellID={this.state.WellID} />
          </div>
          <div className="col-lg-8 border">
          <Chart WellID={this.state.WellID} dateRange={this.state.dateRange} />
          </div>
          <div className="col-lg-2 border">
          <Todo />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

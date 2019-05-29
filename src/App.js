import React from 'react';
import WellInfo from './components/WellInfo';
import Navbar from './components/Navbar';
import Chart from './components/Chart';
import Todo from './components/Todo';
import './App.css';

class App extends React.Component {
  state = {
    WellID: ''
  }
  wellChange = (WellID) => {
    this.setState({
      WellID
    })
    console.log(WellID);
  }
  render() {
    return (
      <div className="App">
        <Navbar wellChange={this.wellChange} />
        <div className="row">
          <div className="col-lg-2 border">
            <WellInfo WellID={this.state.WellID} />
          </div>
          <div className="col-lg-8 border">
          <Chart WellID={this.state.WellID} />
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

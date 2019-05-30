import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import master from '../data/master';

export class Navbar extends Component {
  state = {
    WellID: 'Select a well',
    dateRange: 365,
    startDate: '',
    endDate: ''
  }
  handleChangeStart = (date) => {
    this.setState({
      startDate: date
    });
    this.props.getStartDate(date);
  }
  handleChangeEnd = (date) => {
    this.setState({
      endDate: date
    });
    this.props.getEndDate(date);
  }
  getText = (e) => {
    const WellID = e.target.innerHTML;
    this.setState({
      WellID,
      startDate: '',
      endDate: ''
    });
    this.props.wellChange(WellID);
  }
  onDateChange = (e) => {
    const dateRange = e.target.innerHTML;
    this.setState({
      dateRange
    });
    this.props.dateChange(dateRange);
  }
  getStyle = () => {
    if(this.state.WellID === 'Select a well') {
      return true
    } else {
      return false
    }
  }
  render() {
    return (
      <div className="navbar_component navbar-container text-white">
        <a className="navbar-brand" href="#"><img className="ovs-logo float-left" src="https://i.imgur.com/ow7oAOJ.png" /></a>
        <div className="dropdown">
          <button className="well-button btn btn-lg btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
            {this.state.WellID}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
              master.map((well) => (
                <a onClick={this.getText} className="dropdown-item" href="#" key={well.WellID}>{well.WellID}</a>
              ))
            }
          </div>
            <button className="btn date-button text-white" disabled={this.getStyle()} onClick={this.onDateChange}>3M</button>
            <button className="btn date-button text-white" disabled={this.getStyle()} onClick={this.onDateChange}>6M</button>
            <button className="btn date-button text-white" disabled={this.getStyle()} onClick={this.onDateChange}>1Y</button>
            <button className="btn date-button text-white" disabled={this.getStyle()} onClick={this.onDateChange}>3Y</button>
            <button className="btn date-button text-white" disabled={this.getStyle()} onClick={this.onDateChange}>5Y</button>
          <div className="datePicker-container float-right">
            Start Date:{' '} 
          <DatePicker
            className="datepicker"
            selected={this.state.startDate}
            format="dd/MM/yyyy"
            selectsStart
            startDate={this.state.startDate}
            onChange={this.handleChangeStart}
          />{' '}
          End Date:{' '} 
          <DatePicker
            className="datepicker"
            selected={this.state.endDate}
            selectsEnd
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            minDate={this.state.startDate}
          />
          </div>
          
        </div>
      </div>
    )
  }
}

export default Navbar

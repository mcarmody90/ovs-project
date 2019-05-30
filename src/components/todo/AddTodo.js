import React, { Component } from 'react'

export class AddTodo extends Component {
  state = {
    title: ''
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' })
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className="todo--form">
        <input
          type="text"
          name="title"
          className="todo--input"
          placeholder="Add Todo..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <input 
          type="submit"
          value="Submit"
          className="btn todo--submit"
        />
      </form>
    )
  }
}

export default AddTodo

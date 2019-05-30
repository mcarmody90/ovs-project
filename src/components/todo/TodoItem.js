import React, { Component } from 'react'

export class TodoItem extends Component {
  getStyle = () => {
    return {
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    }
  }
  render() {
    const { id, title } = this.props.todo;
    return (
      <div className="initialism todo_item" style={this.getStyle()}>
        <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
        {this.props.todo.title}
        <button className="btn todo-btn btn-sm" onClick={this.props.removeTodo.bind(this, id)}>x</button>
      </div>
    )
  }
}

export default TodoItem

import React, { Component } from 'react'

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: this.props.todo.completed ? '#fff' : '#909090',
      color: this.props.todo.completed ? '#000' : '#fff'
    }
  }
  render() {
    const { id } = this.props.todo;
    return (
      <div href="#" className="todo_item--container" style={this.getStyle()}>
        <div className="initialism text-left todo_item" onClick={this.props.markComplete.bind(this, id)}>
          <span className="todo_item--text">{this.props.todo.title}</span>
        </div>
        <div className="todo_button--container">
          <button className="btn todo_button btn-sm" onClick={this.props.removeTodo.bind(this, id)}><i className="material-icons md-48">delete_outline</i></button>
        </div>
      </div>
    )
  }
}

export default TodoItem

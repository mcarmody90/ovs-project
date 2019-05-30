import React, { Component } from 'react';
import uuid from 'uuid';
import Todos from './todo/Todos';
import AddTodo from './todo/AddTodo';

export class Todo extends Component {
  state = {
    todos: []
  }
  componentDidMount() {
    let todos = JSON.parse(localStorage.getItem('todos'));
    if(todos.length > 0) {
      this.setState({
        todos
      })
    } else {
      this.setState({
        todos: [{id: '1', title: 'Add something to do', completed: false}]
      })
    }
  }
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }
  removeTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }
  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] });
    localStorage.setItem('todos', JSON.stringify(this.state.todos))
  }
  render() {
    return (
      <div>
        <h1>Todo</h1>
        <AddTodo addTodo={this.addTodo} />
        <Todos 
          todos={this.state.todos} 
          markComplete={this.markComplete}
          removeTodo={this.removeTodo} 
        />
      </div>
    )
  }
}

export default Todo

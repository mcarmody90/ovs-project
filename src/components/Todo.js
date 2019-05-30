import React, { Component } from 'react';
import axios from 'axios';
import Todos from './todo/Todos';
import AddTodo from './todo/AddTodo';

export class Todo extends Component {
  state = {
    todos: []
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({
      todos: res.data
    }));
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
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }
  addTodo = (title, id) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      id,
      title,
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data ]}));
  }
  render() {
    return (
      <div>
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

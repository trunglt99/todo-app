import React, {PureComponent} from 'react';
import Todo from './Components/todo';
import Header from './Components/head';
import TodoList from './Components/todolist';
import './Components/todo.css'

const filterByStatus = (listTodos = [], status = '', id) => {
  switch (status) {
    case 'ACTIVE':
      return listTodos.filter(item => !item.isCompleted)
    case 'COMPLETED':
      return listTodos.filter(item => item.isCompleted)
    case 'REMOVE':
      return listTodos.filter(item => item.id !== id)
    default:
      return listTodos
  }
}


class App extends PureComponent {
  state = {
    listTodos: [],
    isCheckedAll: false,
    status: 'ALL',
    todoEditingId: ''
  }

  addTodos = (todo = {}) => {
    this.setState(preState => ({
      listTodos: [...preState.listTodos, todo]
    }))
  }



  getEditTodo = (id = '') => {
    this.setState({
      todoEditingId: id
    })
  }

  editTodo = (todo, index) => {
    const { listTodos } = this.state
    listTodos.splice(index, 1, todo)
    this.setState({ listTodos })
  }

  removeTodo = (id = '') => {
    this.setState(prevState => ({
      listTodos: filterByStatus(prevState.listTodos, 'REMOVE', id)
    }))
  }

  render() {
    const { listTodos, status, todoEditingId } = this.state
    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodos}
        />
        <TodoList
          listTodos={filterByStatus(listTodos, status)}
          todoEditingId={todoEditingId}
          getEditTodo={this.getEditTodo}
          editTodo={this.editTodo}
          removeTodo={this.removeTodo}
        />
      </div>
    );

  }
}

export default App;
import React, { Component } from 'react'
import styled from "styled-components"

import Todo from "./Todo.js"
import TodoModel from "./TodoModel"

class App extends Component {
  state = {
    todos: [
      new TodoModel("Delete this")
    ]
  }
  render() {
    const {todos} = this.state
    return (
      <AppView>
        <TodoForm>
          <input type="text" name="new-todo" />
          <AddTodo onClick={this._createTodo}>Add Todo</AddTodo>
        </TodoForm>
        <Todo todos={todos} />
      </AppView>
    )
  }
  _createTodo = (e) => {
    e.preventDefault()
    const todoText = document.querySelector("[name=new-todo]").value
    const newTodo = new TodoModel(todoText)
    
    this.setState({todos: this.state.todos.concat(newTodo)})
  }
}

const AddTodo = styled.button``
const TodoForm = styled.form``
const AppView = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default App

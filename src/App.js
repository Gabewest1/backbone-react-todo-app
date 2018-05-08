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
        <Wrapper>
          <h1>React Backbone TODO</h1>
          <TodoForm id="todoForm" onSubmit={this._createTodo}>
            <input type="text" name="new-todo" />
            <AddTodo>Add Todo</AddTodo>
          </TodoForm>
          <Todo todos={todos} removeTodo={this._removeTodo} />
        </Wrapper>
      </AppView>
    )
  }
  _createTodo = (e) => {
    e.preventDefault()
    
    const todoText = document.querySelector("[name=new-todo]").value
    const newTodo = new TodoModel(todoText)
    this.setState({todos: [...this.state.todos, newTodo]})
    document.getElementById("todoForm").reset()
  }
  _removeTodo = todoToRemove => {
    const {todos} = this.state

    this.setState({
      todos: todos.filter(todo => todoToRemove.get("id") !== todo.get("id"))
    })
  }
}

const AddTodo = styled.button``
const TodoForm = styled.form`
  display: flex;
  
  input {
    flex: 1;
    height: 54px;
    box-sizing: border-box;
  }
`
const Wrapper = styled.div`
  width: 80%;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
  top: 20%;
`
const AppView = styled.div`
  height: 100vh;
`
export default App

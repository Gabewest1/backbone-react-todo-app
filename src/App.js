import React, { Component } from 'react'
import styled from "styled-components"
import Backbone from "backbone"
import withBackbone from "with-backbone"

import TodosList from "./components/TodosList"
import RainbowText from "./components/shared/RainbowText"

import TodoModel from "./models/TodoModel"
import TodoCollection from "./collections/TodoCollection"

class App extends Component {
  state = {
    todos: new TodoCollection([
      new TodoModel("Delete this")
    ])
  }
  render() {
    const {todos} = this.state

    return (
      <AppView>
        <Wrapper>
          <RainbowText>
            <h1>React Backbone TODO</h1>
          </RainbowText>
          <TodoForm id="todoForm" onSubmit={this._createTodo}>
            <input type="text" name="new-todo" />
            <AddTodo>Add Todo</AddTodo>
          </TodoForm>
          <TodosList
            todos={todos}
            removeTodo={this._removeTodo}
          />
        </Wrapper>
      </AppView>
    )
  }
  _createTodo = (e) => {
    e.preventDefault()
    
    const todoText = document.querySelector("[name=new-todo]").value
    const newTodo = new TodoModel(todoText)
    this.state.todos.add(newTodo)
    document.getElementById("todoForm").reset()
  }
  _removeTodo = todo => {
    this.state.todos.remove(todo)
  }
}

const AddTodo = styled.button``
const TodoForm = styled.form`
  display: flex;
  
  input {
    flex: 1;
    height: 54px;
    box-sizing: border-box;
    padding-left: 15px;
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
export default withBackbone(App)

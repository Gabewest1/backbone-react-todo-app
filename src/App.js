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
      new TodoModel("Delete this 1"),
      new TodoModel("Delete this 2"),
      new TodoModel("Delete this 3")
    ]),
  }
  
  render() {
    const {todos} = this.state

    return (
      <AppView { ...this.state }>
        <Wrapper>
          <RainbowText>
            <h1>React Backbone TODO</h1>
          </RainbowText>
          <Filters>
            <FilterOption>
              <label>Show First:</label>
              <input type="number" name="showFirst" min={0} max={todos.length} onChange={this._applyFilters} />
            </FilterOption>
            <FilterOption>
              <label>Reverse:</label>
              <input type="checkbox" name="reverse" onChange={this._applyFilters} />
            </FilterOption>
            <FilterOption>
              <label>Contains Text:</label>
              <input type="text" name="containsText" onChange={this._applyFilters} />
            </FilterOption>
          </Filters>
          <TodoForm id="todoForm" onSubmit={this._createTodo}>
            <input type="text" name="new-todo" data-test="newTodoInput" />
            <AddTodo data-test="newTodoBtn">Add Todo</AddTodo>
          </TodoForm>
          <TodosList
            todos={todos.filtered}
            removeTodo={this._removeTodo}
            data-test="todos"
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
  _applyFilters = () => {
    const showFirst = document.querySelector("[name='showFirst']")
    const reverse = document.querySelector("[name='reverse']")
    const containsText = document.querySelector("[name='containsText']")

    const filterParams = {
      first: showFirst && showFirst.value,
      text: containsText && containsText.value,
      reverse: reverse && reverse.checked
    }

    this.state.todos.filterBy(filterParams)
  }
}

const AddTodo = styled.button``
const FilterOption = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 7px;
  }
  input[type=checkbox] {
    width: 18px;
    height: 18px;
  }
`
const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
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

import React from "react"
import styled from "styled-components"

import TodosList from "../TodosList"

import TodoModel from "../../models/TodoModel"
import TodoCollection from "../../collections/TodoCollection"

class TodoApplication extends React.Component {
  state = {
    todos: new TodoCollection(),
  }
  render() {
    const { todos } = this.state

    return (
      <TodoApplicationView>
        <Filters>
          <FilterOption>
            <label>Show First:</label>
            <input
              type="number"
              name="showFirst"
              min={0}
              max={todos.length}
              data-test="limitTodos"
              onChange={this._applyFilters}
            />
          </FilterOption>
          <FilterOption>
            <label>Reverse:</label>
            <input
              type="checkbox"
              name="reverse"
              data-test="reverseTodos"
              onChange={this._applyFilters}
            />
          </FilterOption>
          <FilterOption>
            <label>Contains Text:</label>
            <input
              type="text"
              name="containsText"
              data-test="filterTodos"
              onChange={this._applyFilters}
            />
          </FilterOption>
        </Filters>

        <TodoForm id="todoForm" onSubmit={this._createTodo}>
          <input type="text" name="new-todo" data-test="newTodoInput" />
          <AddTodo data-test="newTodoBtn">Add Todo</AddTodo>
        </TodoForm>

        <TodosList todos={todos.filtered} removeTodo={this._removeTodo} data-test="todos" />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SaveTodosButton onClick={this._saveTodos} data-test="saveTodos">
            Save Todos
          </SaveTodosButton>
          <FetchTodosButton onClick={this._fetchTodos} data-test="fetchTodos">
            Fetch Saved Todos
          </FetchTodosButton>
        </div>
      </TodoApplicationView>
    )
  }
  _createTodo = e => {
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
      reverse: reverse && reverse.checked,
    }

    this.state.todos.filterBy(filterParams)
  }
  _saveTodos = () => {
    const { todos } = this.state

    fetch("/saveTodos", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos }),
    })
      .then(res => console.log("SAVING RESPONSE:", res))
      .catch(err => console.log("Err:", err))
  }
  _fetchTodos = () => {
    fetch("/getTodos", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(todos => {
        const removeTodosAlreadyExisting = todo =>
          this.state.todos.every(t => t.get("text") !== todo.text)
        const createNewTodo = todo => this.state.todos.add(new TodoModel(todo.text))

        todos.filter(removeTodosAlreadyExisting).forEach(createNewTodo)
      })
      .catch(err => console.log("Err:", err))
  }
}

const SaveTodosButton = styled.button``
const FetchTodosButton = styled.button``
const AddTodo = styled.button``
const FilterOption = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 7px;
  }
  input[type="checkbox"] {
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
const TodoApplicationView = styled.div``

export default TodoApplication

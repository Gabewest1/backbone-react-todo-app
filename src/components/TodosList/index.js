import React from "react"
import styled from "styled-components"
import withBackbone from "with-backbone"

import TodoItem from "./TodoItem"

class TodosList extends React.Component {
  render() {
    const { todos, editTodoStart, editTodoEnd, removeTodo } = this.props

    return (
      <TodosListView {...this.props}>
        {todos.map(todo => <TodoItem key={todo.get("id")} todo={todo} removeTodo={removeTodo} />)}
      </TodosListView>
    )
  }
}

const TodosListView = styled.ul`
  margin: 0;
  padding: 0;
`

export default withBackbone(TodosList)

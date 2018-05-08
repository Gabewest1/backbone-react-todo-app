import React from "react"
import styled from "styled-components"
import withBackbone from "with-backbone"

import TodoItem from "./TodoItem"

class Todos extends React.Component {
    render() {
        const { todos, editTodoStart, editTodoEnd, removeTodo } = this.props
        console.log("PROPS:", this.props)
        return (
            <TodosList {...this.props}>
                { todos.map((todo) => 
                    <TodoItem 
                        todo={todo} 
                        editTodoStart={editTodoStart}
                        editTodoEnd={editTodoEnd}
                        removeTodo={removeTodo}
                    />
                )}
            </TodosList>
        )
    }
} 

const TodosList = styled.ul`
    margin: 0;
    padding: 0;
`

export default withBackbone(Todos)

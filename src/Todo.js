import React from "react"
import styled from "styled-components"

import TodoModel from "./TodoModel"

export default class Todo extends React.Component{
    state = { todos: [
        new TodoModel("Delete this")
    ] }
    render() {
        const {todos} = this.state

        return (
            <TodoView {...this.props}>
                { todos.map((todo) => 
                    <TodoItem 
                        key={todo.getText()}
                        color={todo.getColor()}
                    >
                        {todo.getText()}
                    </TodoItem>
                )}
            </TodoView>
        )
    }
} 

const TodoItem = styled.li`
    height: 120px;
    display: flex;
    align-items: center;
    margin: 0;
    color: ${({color}) => color};
`
const TodosList = styled.ul`
    display: inline-block;
    width: 80%;
    max-width: 768px;
    margin: 0 auto;
    padding: 0;
`
const TodoView = styled.div``
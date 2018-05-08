import React from "react"
import styled from "styled-components"

export default props => (
    <TodosList {...props}>
        { props.todos.map((todo) => 
            <TodoItem 
                key={todo.get("id")}
                color={todo.get("color")}
            >
                {todo.get("text")}
                <RemoveTodo onClick={() => props.removeTodo(todo)}>X</RemoveTodo>
            </TodoItem>
        )}
    </TodosList>
)

const RemoveTodo = styled.span`
    cursor: pointer;
`
const TodoItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 10px;
    color: ${({color}) => color};
`
const TodosList = styled.ul`
    margin: 0;
    padding: 0;
`
const TodoView = styled.div``
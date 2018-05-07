import React from "react"
import styled from "styled-components"

export default props => (
    <TodoView {...props}>
        { props.todos.map((todo) => 
            <TodoItem 
                key={todo.get("id")}
                color={todo.get("color")}
            >
                {todo.get("text")}
                <RemoveTodo onClick={() => props.removeTodo(todo)}>X</RemoveTodo>
            </TodoItem>
        )}
    </TodoView>
)

const RemoveTodo = styled.span``
const TodoItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 10px;
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
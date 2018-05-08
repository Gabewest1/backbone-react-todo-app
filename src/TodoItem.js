import React from "react"
import styled from "styled-components"
import withBackbone from "with-backbone"

import PencilIcon from "./PencilIcon"

class TodoItem extends React.Component {
    render() {
        const { todo, editTodoEnd, editTodoStart, removeTodo } = this.props
        // console.log("PROPS:", props)
        return (
            <TodoItemView 
                {...this.props}
                key={todo.get("id")}
                color={todo.get("color")}
            >
                {todo.get("isEditing")
                    ? <input name="edit-todo" type="text" onChange={(e) => todo.set("text", e.target.value)} value={todo.get("text")} />
                    : todo.get("text")
                }

                <div>
                    <EditTodo alt="edit todo" onClick={() => todo.get("isEditing") ? editTodoEnd(todo) : editTodoStart(todo)} />
                    <RemoveTodo onClick={() => removeTodo(todo)}>X</RemoveTodo>
                </div>
            </TodoItemView>
        )
    }
} 


const EditTodo = styled(PencilIcon)`
    width: 15px;
    margin-right: 10px;
    position: relative;
    top: 1px;
    cursor: pointer;
`
const RemoveTodo = styled.span`
    cursor: pointer;
`
const TodoItemView = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 15px 0px;
    color: ${({color}) => color};

    svg {
        fill: ${({color}) => color};
    }
`

export default withBackbone(TodoItem)

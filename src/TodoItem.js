import React from "react"
import styled from "styled-components"
import withBackbone from "with-backbone"

import PencilIcon from "./PencilIcon"

class TodoItem extends React.Component {
    render() {
        const { todo, editTodoEnd, editTodoStart, removeTodo } = this.props

        return (
            <TodoItemView {...this.props}>
                {todo.get("isEditing")
                    ? <Input name="edit-todo" type="text" value={todo.get("text")} onChange={this._handleOnChange} onKeyPress={this._handleKeyPress} />
                    : todo.get("text")
                }

                <div>
                    <EditTodo alt="edit todo" onClick={() => todo.get("isEditing") ? editTodoEnd(todo) : editTodoStart(todo)} />
                    <RemoveTodo onClick={() => removeTodo(todo)}>X</RemoveTodo>
                </div>
            </TodoItemView>
        )
    }
    _handleOnChange = (e) => {
        const { todo } = this.props
        todo.set("text", e.target.value)
    }
    _handleKeyPress = (e) => {
        const { todo, editTodoEnd } = this.props

        if (e.key === "Enter") {
            editTodoEnd(todo)
        }
    }
} 

class Input extends React.Component {
    componentDidMount() {
        this.input.focus()
    }
    render() {
        return <input { ...this.props } ref={input => this.input = input}/>
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

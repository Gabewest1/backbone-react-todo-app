import React from "react"
import styled from "styled-components"
import withBackbone from "with-backbone"

import PencilIcon from "../shared/PencilIcon"

class TodoItem extends React.Component {
    render() {
        const { todo, removeTodo } = this.props

        return (
            <TodoItemView {...this.props} onDoubleClick={this._handleDoubleClick}>
                {todo.get("isEditing")
                    ? <AutoFocusInput name="edit-todo" type="text" value={todo.get("text")} onChange={this._handleOnChange} onKeyPress={this._handleKeyPress} />
                    : todo.get("text")
                }

                <div>
                    <EditTodo alt="edit todo" onClick={this._toggleIsEditing} />
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
            todo.set("isEditing", false)
        }
    }
    _toggleIsEditing = () => {
        const { todo } = this.props

        todo.set("isEditing", !todo.get("isEditing"))
    }
    _handleDoubleClick = (e) => {
        const { todo } = this.props        
        todo.set("isEditing", true)
    }
}

class AutoFocusInput extends React.Component {
    componentDidMount() {
        this.input.focus()
    }
    render() {
        return <AutoFocusInputView { ...this.props } innerRef={input => this.input = input}/>
    }
}

const AutoFocusInputView = styled.input`
    height: 100%;
    padding: inherit;
    margin-left: -15px;
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
`
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
    height: 51px;
    padding: 0px 15px;
    font-weight: bolder;
    font-size: 20px;
    background: ${({todo}) => todo.get("background")};    
    color: ${({todo}) => todo.get("color")};

    svg {
        fill: ${({todo}) => todo.get("color")};
    }
`

export default withBackbone(TodoItem)

import React, { Component } from 'react'
import styled from "styled-components"
import Todo from "./Todo.js"

class App extends Component {
  render() {
    return (
      <AppView>
        <Todo />
      </AppView>
    )
  }
}

const AppView = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default App

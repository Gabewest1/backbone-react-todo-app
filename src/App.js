import React, { Component } from 'react'
import styled from "styled-components"
import Backbone from "backbone"

import TodoApplication from "./components/TodoApplication"
import RainbowText from "./components/shared/RainbowText"

import TodoModel from "./models/TodoModel"
import TodoCollection from "./collections/TodoCollection"

class App extends Component {
  render() {
    return (
      <AppView { ...this.state }>
        <Wrapper>
          <RainbowText>
            <h1>React Backbone TODO</h1>
          </RainbowText>
          <TodoApplication />
        </Wrapper>
      </AppView>
    )
  }
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
  top: 20%;
`
const AppView = styled.div`
  height: 100vh;
`
export default App

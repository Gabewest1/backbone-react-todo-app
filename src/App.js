import React, { Component } from 'react'
import styled from "styled-components"
import { Route, BrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppView { ...this.props }>
            <Route exact match="/" component={ Login } />
            <Route exact match="/home" component={ Home } />
        </AppView>
      </BrowserRouter>
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

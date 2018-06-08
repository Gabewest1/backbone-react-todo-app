import React, { Component } from 'react'
import styled from "styled-components"
import { Route, BrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppView {...this.props}>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </AppView>
      </BrowserRouter>
    )
  }
}

const AppView = styled.div`
  height: 100vh;
`

export default App

import React from "react"
import styled from "styled-components"

import TodoApplication from "../../components/TodoApplication"
import RainbowText from "../../components/shared/RainbowText"

class Home extends React.Component {
  render() {
    return (
      <HomeView {...this.state}>
        <Wrapper>
          <RainbowText>
            <h1>React Backbone TODO</h1>
          </RainbowText>
          <TodoApplication />
        </Wrapper>
      </HomeView>
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
const HomeView = styled.div`
  height: 100vh;
`
export default Home

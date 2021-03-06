import React from "react"
import styled from "styled-components"
import randomColor from "random-color"

export default class RainbowText extends React.Component {
  state = { color: randomColor().hexString(), timing: 1500 }
  render() {
    return (
      <HeaderView {...this.props} {...this.state}>
        {this.props.children}
      </HeaderView>
    )
  }
  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ color: randomColor().hexString() }),
      this.state.timing
    )
  }
  componentWillUnmount() {
    this.timer = clearInterval(this.timer)
  }
}

const HeaderView = styled.div`
  color: ${({ color }) => color};
  transition: all ${({ timing }) => timing}ms linear;
`

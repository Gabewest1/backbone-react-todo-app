import React from 'react'
import styled from "styled-components"

import RainbowText from "../../components/shared/RainbowText"

class Login extends React.Component {
  render() {
    return (
      <LoginView { ...this.state }>
        <Wrapper>
          <RainbowText>
            <h1>React Backbone TODO</h1>
          </RainbowText>

          <LoginForm onSubmit={ this._handleSubmit }>
            <InputWrapper>
              <label>Username or Email:</label>
              <input type="text" name="username" />
            </InputWrapper>
            <InputWrapper>
              <label>Password:</label>
              <input type="text" name="password" />
            </InputWrapper>

            <SubmitButton>Login</SubmitButton>
          </LoginForm>

        </Wrapper>
      </LoginView>
    )
  }
  _handleSubmit = e => {
    e.preventDefault()

    const username = document.querySelector("[name=username]").value
    const password = document.querySelector("[name=password]").value

    fetch("/login", { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password }) 
    })
      .then(res => console.log("GOT LOGIN RES:", res, res.json()))
      .catch(err => console.log("LOGIN ERROR:", err))
  }
}

const SubmitButton = styled.button``
const InputWrapper = styled.div``
const LoginForm = styled.form``
const Wrapper = styled.div`
  width: 80%;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
  top: 20%;
`
const LoginView = styled.div`
  height: 100vh;
`
export default Login

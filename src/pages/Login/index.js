import React from 'react'
import styled from "styled-components"
import { Redirect } from "react-router-dom"

import RainbowText from "../../components/shared/RainbowText"

const LOGIN_FORM = "LOGIN_FORM"
const SIGNUP_FORM = "SIGNUP_FORM"

class Login extends React.Component {
  state = { 
    isLoggedIn: false,
    loginForm: { errors: {} },
    signUpForm: { errors: {} },
    activeForm: "",
    isLoading: false,
    showSpinner: false,
    setSpinner: false,
    spinnerDuration: 2000,
    shouldRedirect: false
  }
  render() {
    const { activeForm, shouldRedirect, isLoggedIn, isLoading, spinnerDuration, setSpinner, showSpinner } = this.state

    const shouldShowSpinner = isLoading && setSpinner
    if (shouldShowSpinner) {
      setTimeout(() => {
        this.setState({ showSpinner: true, setSpinner: false })
        setTimeout(() => {
          this.setState({ showSpinner: false })      
        }, spinnerDuration)
      }, 1)
    }

    if (shouldRedirect && !showSpinner) {
      return <Redirect to="/home" push />
    }
    
    return (
      <LoginView { ...this.state }>
        <Wrapper>
          <RainbowText>
            <h1>React Backbone TODO</h1>
          </RainbowText>

          <FormsContainer>
            <FormWrapper>
              <h1>Login</h1>
              <Form onSubmit={ this._handleLogin }>
                {(showSpinner || isLoading) && activeForm === LOGIN_FORM
                ? <p>Logging in</p>
                :
                <div>
                  <InputWrapper>
                    <label>Username or Email:</label>
                    <input type="text" name="username" />
                  </InputWrapper>
                  <InputWrapper>
                    <label>Password:</label>
                    <input type="text" name="password" />
                  </InputWrapper>
                </div>
                }
                <SubmitButton>Login</SubmitButton>
              </Form>
            </FormWrapper>

            <FormWrapper>
              <h1>Sign Up</h1>
              <Form onSubmit={ this._handleSignUp }>
                {(showSpinner || isLoading) && activeForm === SIGNUP_FORM
                ? <p>Registering Your Account :D</p>
                :
                  <div>
                    <InputWrapper>
                      <label>Email</label>
                      <input type="email" name="email" />
                    </InputWrapper>
                    <InputWrapper>
                      <label>Username:</label>
                      <input type="text" name="username" />
                    </InputWrapper>
                    <InputWrapper>
                      <label>Password:</label>
                      <input type="text" name="password" />
                    </InputWrapper>
                  </div>
                }

                <SubmitButton>Register</SubmitButton>
              </Form>
            </FormWrapper>
          </FormsContainer>

        </Wrapper>
      </LoginView>
    )
  }
  _handleLogin = e => {
    e.preventDefault()

    const username = e.target.querySelector("[name=username]").value
    const password = e.target.querySelector("[name=password]").value

    fetch("/login", { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password }) 
    })
      .then(res => {
        console.log("GOT LOGIN RES:", res)
        if (res.status === 200) {
          this.setState({ shouldRedirect: true, isLoggedIn: true, isLoading: false })
        } else {
          res.json().then(err => {
            console.log("LOGIN ERRORS:", err)
            this.setState({ loginForm: { errors: err }, isLoading: false })
          })
        }
      })
      .catch(err => {
        console.log("LOGIN ERROR:", err)
        this.setState({ loginForm: { errors: err }, isLoading: false })
      })

    this.setState({ isLoading: true, setSpinner: true, activeForm: LOGIN_FORM })
  }
  _handleSignUp = e => {
    e.preventDefault()

    const email = e.target.querySelector("[name=email]").value
    const username = e.target.querySelector("[name=username]").value
    const password = e.target.querySelector("[name=password]").value
    
    fetch("/signup", { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, username, password }) 
    })
      .then(res => {
        console.log("GOT SIGN UP RES:", res)
        if (res.status === 200) {
          this.setState({ shouldRedirect: true, isLoggedIn: true, isLoading: false })
        } else {
          res.json().then(err => {
            console.log("SIGN UP ERRORS:", err)
            this.setState({ SignUpForm: { errors: err }, isLoading: false })
          })
        }
      })
      .catch(err => {
        console.log("SIGN UP ERROR:", err)
        this.setState({ SignUpForm: { errors: err }, isLoading: false })
      })
    
    this.setState({ isLoading: true, setSpinner: true, activeForm: SIGNUP_FORM })  
  }
}

const options = {
  lines: 13,
  length: 20,
  width: 10,
  radius: 30,
  scale: 1.00,
  corners: 1,
  color: '#000',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: false,
  position: 'absolute'
}

const SubmitButton = styled.button``
const InputWrapper = styled.div`
  label {
    display: block;
  }
  input {
    width: 100%;
  }
`
const Form = styled.form``
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
const FormWrapper = styled.div``
const FormsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
export default Login

import React from "react"
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
    shouldRedirect: false,
  }
  render() {
    const {
      activeForm,
      shouldRedirect,
      isLoggedIn,
      isLoading,
      spinnerDuration,
      setSpinner,
      showSpinner,
    } = this.state

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
      <LoginView {...this.state}>
        <Wrapper>
          <StyledRainbowText>
            <h1>React Backbone TODO</h1>
          </StyledRainbowText>

          <FormsContainer>
            <FormWrapper>
              <h1>Login</h1>
              <Form onSubmit={this._handleLogin}>
                {(showSpinner || isLoading) && activeForm === LOGIN_FORM ? (
                  <p>Logging in</p>
                ) : (
                  <div>
                    <InputView
                      label={{ text: "Username or Email:" }}
                      input={{ type: "text", name: "username", "data-test": "loginUsername" }}
                      error={{
                        "data-test": "loginUsernameError",
                        message: this.state.loginForm.errors.username,
                      }}
                    />
                    <InputView
                      label={{ text: "Password:" }}
                      input={{ type: "text", name: "password", "data-test": "loginPassword" }}
                      error={{
                        "data-test": "loginPasswordError",
                        message: this.state.loginForm.errors.password,
                      }}
                    />
                  </div>
                )}
                <SubmitButton data-test="loginSubmit">Login</SubmitButton>
              </Form>
            </FormWrapper>

            <FormWrapper>
              <h1>Sign Up</h1>
              <Form onSubmit={this._handleSignUp}>
                {(showSpinner || isLoading) && activeForm === SIGNUP_FORM ? (
                  <p>Registering Your Account :D</p>
                ) : (
                  <div>
                    <InputView
                      label={{ text: "Email:" }}
                      input={{ type: "email", name: "email", "data-test": "signupEmail" }}
                    />
                    <InputView
                      label={{ text: "Username:" }}
                      input={{ type: "text", name: "username", "data-test": "signupUsername" }}
                    />
                    <InputView
                      label={{ text: "Password:" }}
                      input={{ type: "text", name: "password", "data-test": "signupPassword" }}
                    />
                  </div>
                )}

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

    this._submit("/login", { username, password }, "loginForm")

    this.setState({ isLoading: true, setSpinner: true, activeForm: LOGIN_FORM })
  }
  _submit = (url, body, form) => {
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(possibleErrors => {
        console.log("GOT LOGIN possibleErrors:", possibleErrors)
        const noErrors = Object.keys(possibleErrors).length === 0
        if (noErrors) {
          this.setState({
            shouldRedirect: true,
            isLoggedIn: true,
            isLoading: false,
          })
        } else {
          console.log("LOGIN ERRORS:", possibleErrors)
          this.setState({ [form]: { errors: possibleErrors }, isLoading: false })
        }
      })
      .catch(err => {
        console.log("LOGIN ERROR:", err)
        this.setState({ [form]: { errors: err }, isLoading: false })
      })
  }
  _handleSignUp = e => {
    e.preventDefault()

    const email = e.target.querySelector("[name=email]").value
    const username = e.target.querySelector("[name=username]").value
    const password = e.target.querySelector("[name=password]").value

    this._submit("/signup", { email, username, password }, "signUpForm")

    this.setState({
      isLoading: true,
      setSpinner: true,
      activeForm: SIGNUP_FORM,
    })
  }
}

const InputView = props => (
  <InputWrapper>
    <label {...props.label}>
      {props.label.text}
      {props.error && <Error {...props.error}>{props.error.message}</Error>}
    </label>
    <input {...props.input} />
  </InputWrapper>
)

const Error = styled.span`
  color: red;
  margin-left: 10px;
`

const StyledRainbowText = styled(RainbowText)`
  h1 {
    margin-bottom: 6px;
    text-align: center;
    font-size: 2.5em;
    border-bottom: 1px solid;
    margin-bottom: 5px;
  }
`
const SubmitButton = styled.button`
  margin-top: 10px;
`
const InputWrapper = styled.div`
  label {
    display: block;
  }
  input {
    width: 100%;
  }
`
const Form = styled.form`
  p {
    font-weight: 200;
  }
`
const Wrapper = styled.div`
  width: 80%;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
`
const LoginView = styled.div`
  height: 100vh;
`
const FormWrapper = styled.div`
  flex: 0 1 48%;
`
const FormsContainer = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`
export default Login

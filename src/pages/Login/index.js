import React from "react"
import styled from "styled-components"
import { Redirect } from "react-router-dom"

import RainbowText from "../../components/shared/RainbowText"

const LOGIN_FORM = "LOGIN_FORM"
const SIGNUP_FORM = "SIGNUP_FORM"

class Login extends React.Component {
  state = {
    isLoggedIn: false,
    loginForm: { errors: {}, usernameVal: "", passwordVal: "" },
    signupForm: { errors: {}, usernameVal: "", emailVal: "", passwordVal: "" },
    activeForm: "",
    isLoading: false,
    showSpinner: false,
    setSpinner: false,
    spinnerDuration: 2000,
    shouldRedirect: false,
  }
  render() {
    const {
      loginForm,
      signupForm,
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
              <Form onSubmit={e => this._submitForm(e, ["username", "password"], LOGIN_FORM)}>
                {(showSpinner || isLoading) && activeForm === LOGIN_FORM ? (
                  <p>Logging in</p>
                ) : (
                  <div>
                    <InputView
                      label={{ text: "Username or Email:" }}
                      input={{
                        type: "text",
                        name: "username",
                        value: loginForm.usernameVal,
                        onChange: this._updateInputVal("loginForm"),
                        "data-test": "loginUsername",
                      }}
                      error={{
                        "data-test": "loginUsernameError",
                        message: loginForm.errors.username,
                      }}
                    />
                    <InputView
                      label={{ text: "Password:" }}
                      input={{
                        type: "text",
                        name: "password",
                        value: loginForm.passwordVal,
                        onChange: this._updateInputVal("loginForm"),
                        "data-test": "loginPassword",
                      }}
                      error={{
                        "data-test": "loginPasswordError",
                        message: loginForm.errors.password,
                      }}
                    />
                  </div>
                )}
                <SubmitButton data-test="loginSubmit">Login</SubmitButton>
              </Form>
            </FormWrapper>

            <FormWrapper>
              <h1>Sign Up</h1>
              <Form
                onSubmit={e => this._submitForm(e, ["email", "username", "password"], SIGNUP_FORM)}
              >
                {(showSpinner || isLoading) && activeForm === SIGNUP_FORM ? (
                  <p>Registering Your Account :D</p>
                ) : (
                  <div>
                    <InputView
                      label={{ text: "Email:" }}
                      input={{
                        type: "email",
                        name: "email",
                        value: signupForm.emailVal,
                        "data-test": "signupEmail",
                        onChange: this._updateInputVal("signupForm"),
                      }}
                      error={{
                        "data-test": "signupEmailError",
                        message: signupForm.errors.email,
                      }}
                    />
                    <InputView
                      label={{ text: "Username:" }}
                      input={{
                        type: "text",
                        name: "username",
                        value: signupForm.usernameVal,
                        "data-test": "signupUsername",
                        onChange: this._updateInputVal("signupForm"),
                      }}
                      error={{
                        "data-test": "signupUsernameError",
                        message: signupForm.errors.username,
                      }}
                    />
                    <InputView
                      label={{ text: "Password:" }}
                      input={{
                        type: "text",
                        name: "password",
                        value: signupForm.passwordVal,
                        "data-test": "signupPassword",
                        onChange: this._updateInputVal("signupForm"),
                      }}
                      error={{
                        "data-test": "signupPasswordError",
                        message: signupForm.errors.password,
                      }}
                    />
                  </div>
                )}

                <SubmitButton data-test="signupSubmit">Register</SubmitButton>
              </Form>
            </FormWrapper>
          </FormsContainer>
        </Wrapper>
      </LoginView>
    )
  }
  _submitForm = (e, inputNames, activeForm) => {
    e.preventDefault()

    const inputValuesForServer = {}
    const errors = inputNames.reduce((errors, name) => {
      const value = e.target.querySelector(`[name=${name}]`).value.trim()
      inputValuesForServer[name] = value

      const errorMessage = value === "" ? "Required" : undefined

      return errorMessage ? { ...errors, [name]: errorMessage } : errors
    }, {})

    const hasErrors = Object.keys(errors).filter(err => errors[err] !== undefined).length > 0
    const form = activeForm === LOGIN_FORM ? "loginForm" : "signupForm"
    const url = activeForm === LOGIN_FORM ? "/login" : "/signup"

    if (hasErrors) {
      console.log("HAS ERRORS:", errors)
      this.setState({
        [form]: { ...this.state[form], errors },
      })
    } else {
      this._submit(url, inputValuesForServer, form)

      this.setState({ isLoading: true, setSpinner: true, activeForm })
    }
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
          this.setState({
            [form]: { ...this.state[form], errors: possibleErrors },
            isLoading: false,
          })
        }
      })
      .catch(err => {
        console.log("LOGIN ERROR:", err)
        this.setState({ [form]: { ...this.state[form], errors: err }, isLoading: false })
      })
  }

  _updateInputVal = form => e => {
    const val = e.target.value
    const name = e.target.name

    this.setState({ [form]: { ...this.state[form], [name + "Val"]: val } })
  }
}

const InputView = props => (
  <InputWrapper>
    <label {...props.label}>
      {props.label.text}
      {props.error && props.error.message && <Error {...props.error}>{props.error.message}</Error>}
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

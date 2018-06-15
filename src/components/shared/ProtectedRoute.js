import React from "react"
import { Route, Redirect } from "react-router-dom"

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isUserAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

function isUserAuthenticated() {
  const cookie = document.cookie
  console.log("current path:", window.location.pathname)
  console.log("cookie:", cookie)

  return cookie
}

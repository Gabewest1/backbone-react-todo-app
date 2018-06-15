import React from "react"
import { Route, Redirect } from "react-router-dom"

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isUserAuthenticated() ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

function isUserAuthenticated() {
  const cookie = getCookie("connect.sid")
  console.log("current path:", window.location.pathname)
  console.log("cookie:", cookie)

  return cookie
}

function getCookie(name) {
  function escape(s) {
    return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1")
  }
  var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"))
  return match ? match[1] : null
}

function getElement(selector) {
  return cy.get(`[data-test=${selector}`)
}
function waitForSignup() {
  //This 2s wait is based on the fact that signing up takes a
  //minimum of 2s
  cy.wait("@signup")
  cy.wait(2000)
}

describe("Signing up process", () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "POST",
      url: "/signup",
      responses: [],
    }).as("signup")
    cy.visit("http://localhost:3000")
  })

  it("should signup the user", () => {
    const expectedEndingURL = "http://localhost:3000/home"
    const email = `test-email${Math.random() * Math.random()}@yahoo.com`
    const username = `${Math.random()} ${Math.random()} ${Math.random()}`
    const password = `${Math.random()} ${Math.random()} ${Math.random()}`

    getElement("signupEmail").type(email)
    getElement("signupUsername").type(username)
    getElement("signupPassword").type(password)
    getElement("signupSubmit").click()

    waitForSignup()

    cy.url().then(actualEndingURL => {
      expect(actualEndingURL).to.equal(expectedEndingURL)
    })
  })

  it("should fail to signup user with already existing username", () => {
    const email = `test-email23432@yahoo.com`
    const username = `test-username`
    const password = `password`

    getElement("signupEmail").type(email)
    getElement("signupUsername").type(username)
    getElement("signupPassword").type(password)
    getElement("signupSubmit").click()

    waitForSignup()

    getElement("signupEmailError").should("not.exist")
    getElement("signupUsernameError").should("exist")
    getElement("signupPasswordError").should("not.exist")
  })

  it("should fail to signup user with already existing email", () => {
    const email = `test-email@yahoo.com`
    const username = `non exisiting usermane`
    const password = `password`

    getElement("signupEmail").type(email)
    getElement("signupUsername").type(username)
    getElement("signupPassword").type(password)
    getElement("signupSubmit").click()

    waitForSignup()

    getElement("signupEmailError").should("exist")
    getElement("signupUsernameError").should("not.exist")
    getElement("signupPasswordError").should("not.exist")
  })

  it("should fail to signup the user with no email value", () => {
    const expectedEndingURL = "http://localhost:3000/home"

    getElement("signupUsername").type("non-real-username")
    getElement("signupPassword").type("password")
    getElement("signupSubmit").click()

    getElement("signupEmailError").should("exist")
    getElement("signupUsernameError").should("not.exist")
    getElement("signupPasswordError").should("not.exist")
  })

  it("should fail to signup the user with no username value", () => {
    const expectedEndingURL = "http://localhost:3000/home"

    getElement("signupEmail").type("non-real-email@yahoo.com")
    getElement("signupPassword").type("password")
    getElement("signupSubmit").click()

    getElement("signupEmailError").should("not.exist")
    getElement("signupUsernameError").should("exist")
    getElement("signupPasswordError").should("not.exist")
  })

  it("should fail to signup the user with no password value", () => {
    const expectedEndingURL = "http://localhost:3000/home"

    getElement("signupEmail").type("non-real-email@yahoo.com")
    getElement("signupUsername").type("non-real-username")
    getElement("signupSubmit").click()

    getElement("signupEmailError").should("not.exist")
    getElement("signupUsernameError").should("not.exist")
    getElement("signupPasswordError").should("exist")
  })
})

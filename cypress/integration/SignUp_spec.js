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
})

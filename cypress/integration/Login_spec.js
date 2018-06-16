function getElement(selector) {
  return cy.get(`[data-test=${selector}`)
}
function waitForLogin() {
  //This 2s wait is based on the fact that logging in takes a
  //minimum of 2s. This isn't the best solution b/c if logging in
  //takes more than 2s then we fail D:
  cy.wait(2000)
}
describe("Login and Registering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  // it("should log the user in by email", () => {
  //   const expectedEndingURL = "http://localhost:3000/home"

  //   getElement("loginUsername").type("test-email@yahoo.com")
  //   getElement("loginPassword").type("test-password")
  //   getElement("loginSubmit").click()

  //   waitForLogin()

  //   cy.url().then(actualEndingURL => {
  //     expect(actualEndingURL).to.equal(expectedEndingURL)
  //   })
  // })
  // it("should log the user in by username", () => {
  //   const expectedEndingURL = "http://localhost:3000/home"

  //   getElement("loginUsername").type("test")
  //   getElement("loginPassword").type("test-password")
  //   getElement("loginSubmit").click()

  //   waitForLogin()

  //   cy.url().then(actualEndingURL => {
  //     expect(actualEndingURL).to.equal(expectedEndingURL)
  //   })
  // })
  it("should fail to log the user in with an incorrect username", () => {
    const expectedEndingURL = "http://localhost:3000/home"

    getElement("loginUsername").type("non-real-username")
    getElement("loginPassword").type("test-password")
    getElement("loginSubmit").click()

    waitForLogin()

    getElement("loginUsernameError").should("exist")
    getElement("loginPasswordError").should("not.exist")
  })
  it("should fail to log the user in with an no username value", () => {
    const expectedEndingURL = "http://localhost:3000/home"

    getElement("loginPassword").type("test-password")
    getElement("loginSubmit").click()

    waitForLogin()

    getElement("loginUsernameError").should("exist")
    getElement("loginPasswordError").should("not.exist")
  })
})

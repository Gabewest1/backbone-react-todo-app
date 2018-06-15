function getElement(selector) {
  return cy.get(`[data-test=${selector}`)
}
describe("Login and Registering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("should log the user in by email", () => {
    const expectedEndingURL = "http://localhost:3000/home"

    getElement("loginUsername").type("test-email@yahoo.com")
    getElement("loginPassword").type("test-password")
    getElement("loginSubmit").click()

    //This 2s wait is based on the fact that logging in takes a
    //minimum of 2s. This isn't the best solution b/c if logging in
    //takes more than 2s then we fail D:
    cy.wait(2000)
    cy.url().then(actualEndingURL => {
      expect(actualEndingURL).to.equal(expectedEndingURL)
    })
  })
})

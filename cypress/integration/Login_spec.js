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

    cy.wait(2000)
    cy.url().then(actualEndingURL => {
      expect(actualEndingURL).to.equal(expectedEndingURL)
    })
  })
})

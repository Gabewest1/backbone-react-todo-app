function getElement(selector) {
  return cy.get(`[data-test=${selector}`)
}
describe("Login and Registering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("should log the user in by email", () => {
    getElement("loginUsername").type("test-email@yahoo.com")
    getElement("loginPassword").type("test-password")
    getElement("loginSubmit").click()
  })
})

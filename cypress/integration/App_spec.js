function getElement(selector) {
    return cy.get(`[data-test=${selector}`)
}

describe("Todo Application", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
    it("Adds a new todo", () => {
        const numTodosBefore = getElement("todos").children().length

        getElement("newTodoInput").type("This is a new todo")
        getElement("newTodoBtn").click()

        const numTodosAfter = getElement("todos").children().length

        expect(numTodosBefore + 1).to.equal(numTodosAfter)
    })
    it("Deletes a todo", () => {

    })
    it("Modifies a todo", () => {

    })
}) 
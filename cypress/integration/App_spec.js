function getElement(selector) {
    return cy.get(`[data-test=${selector}`)
}
function addTodo() {
    getElement("newTodoInput").type("This is a new todo")
    getElement("newTodoBtn").click()
}
function removeTodo(todoIndex = 0) {
    getElement("removeTodo").within(todos => todos[todoIndex].click())
}

describe("Todo Application", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
    it("Adds a new todo", () => {
        let numTodosBefore
        let numTodosAfter
        
        getElement("todos").children().should(el => {
          numTodosBefore = Array.from(el).length  
        })

        addTodo()

        getElement("todos").children().should(el => {
            numTodosAfter = Array.from(el).length  
        })
  
        cy.wait(2000).then(() => expect(numTodosAfter).to.equal(numTodosBefore + 1))
    })
    it("Deletes a todo", () => {
        let numTodosBefore
        let numTodosAfter
        
        addTodo()
        getElement("todos").children().should(el => {
          numTodosBefore = Array.from(el).length  
        })

        removeTodo()
        getElement("todos").children().should(el => {
            numTodosAfter = Array.from(el).length  
        })
  
        cy.wait(2000).then(() => expect(numTodosBefore).to.equal(numTodosAfter))
    })
    it("Modifies a todo", () => {

    })
}) 
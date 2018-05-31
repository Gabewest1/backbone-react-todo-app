function getElement(selector) {
    return cy.get(`[data-test=${selector}`)
}
function addTodo(text = "This is a new todo") {
    getElement("newTodoInput").type(text)
    getElement("newTodoBtn").click()
}
function removeTodo(todoIndex = 0) {
    getElement("removeTodo").then(todos => todos[todoIndex].click())
}
function editTodo(todoIndex = 0, newText = "New Text") {
    getElement("todo").eq(todoIndex).within(todos => {
        cy.get("[data-test=editTodo]").click()
        cy.get("[data-test=editTodoInput]")
            .clear()
            .type(newText)
        cy.get("[data-test=editTodo]").click()
    })
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
        const originalText = "This is the first text"
        const newText = "This is the new Text"

        getElement("todo").then(todos => {
            const indexOfNewTodo = todos.length

            addTodo(originalText)
            getElement("todo").last().contains(originalText)
            
            editTodo(indexOfNewTodo, newText)
            getElement("todo").last().contains(newText)
        })
    })
    it("Reverses the order of the todos", () => {
        getElement("todo").then(todosBefore => {
            getElement("reverseTodos").click()

            getElement("todo").then(todosAfter => {
                for (
                    var i = 0, j = todosAfter.length-1;
                    i < todosAfter.length;
                    i++, j--
                ) {
                    expect(todosBefore.eq(i).text()).to.equal(todosAfter.eq(j).text())
                }
            })
        })
    })
    it("Shows the first 2 todos", () => {

    })
    it("Shows todos with the text: 'Hello World'", () => {
        
    })
}) 
const Backbone = require("backbone")
const colors = ["red", "blue", "green", "yellow", "teal", "orange", "purple"]

export default Backbone.Model.extend({
    initialize: (text) => {
        // debugger
        this.text = text
    },
    getText: () => {
        return this.text
    },
    getColor: () => colors[Math.floor(Math.random() * colors.length)] 
})

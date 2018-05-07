const Backbone = require("backbone")

export default Backbone.Model.extend({
    initialize: (text) => {
        // debugger
        this.text = text
    },
    getText: () => {
        return this.text
    }
})

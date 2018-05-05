import Backbone from "backbone"

export default Backbone.Model({
    constructor: (text) => {
        this.text
    },
    getText: () => {
        return this.text
    }
})

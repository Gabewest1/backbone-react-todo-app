import Backbone from "backbone"
import Generator from "id-generator"

const g = new Generator()
const colors = ["red", "blue", "green", "yellow", "teal", "orange", "purple"]

export default Backbone.Model.extend({
    defaults: function() {
        return {
            id: g.newId(),
            color: colors[Math.floor(Math.random() * colors.length)]
        }
    },
    initialize: function(text) {
        this.set({text})
    }
})

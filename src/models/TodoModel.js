import Backbone from "backbone"
import Generator from "id-generator"
import randomColor from "random-color"

const g = new Generator()

export default Backbone.Model.extend({
  defaults: function() {
    return {
      id: g.newId(),
      background: randomColor().hexString(),
      color: randomColor(0.99, 0.99).hexString(),
      isEditing: false
    }
  },
  initialize: function(text) {
    this.set({ text })
  },
  url: function() {
    return `http://localhost:3000/saveme`
  }
})

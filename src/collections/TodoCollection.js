import Backbone from "backbone"
import TodoModel from "../models/TodoModel"

const TodoCollection = Backbone.Collection.extend({
    model: TodoModel,
    getFirst: function(number) {
        return this.models.slice(0, number)
    }
})

export default TodoCollection
  
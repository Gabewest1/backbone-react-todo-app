import Backbone from "backbone"
import TodoModel from "../models/TodoModel"

const TodoCollection = Backbone.Collection.extend({
    model: TodoModel,
    initialize: function (models) {
        this.filtered = new Backbone.Collection(models)
        this.filtered.params = {
            text: "",
            reverse: false,
            first: undefined
        }
        this.on('add', this.refilter)
        this.on('remove', this.refilter)
    },

    filterBy: function (params){
        let {text, first, reverse} = params
        let filteredColl = this.models

        if (first) {
            filteredColl = filteredColl.slice(0, first)
        }
        if (text) {
            filteredColl = filteredColl.filter(todo => todo.get("text").toLowerCase().includes(text.toLowerCase()))
        }
        if (this.filtered.params.reverse !== reverse) {
            filteredColl = filteredColl.reverse()
        }

        this.filtered.params = params
        this.filtered.reset(filteredColl)
    },

    refilter: function() {
        this.filterBy(this.filtered.params)
    }
})

export default TodoCollection
  
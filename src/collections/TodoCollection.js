import Backbone from "backbone"
import TodoModel from "../models/TodoModel"

const TodoCollection = Backbone.Collection.extend({
  model: TodoModel,
  initialize: function(models) {
    this.filtered = new Backbone.Collection(models)
    this.filtered.params = {
      text: "",
      reverse: false,
      first: undefined
    }
    this.on("add", this.refilter)
    this.on("remove", this.refilter)
  },

  filterBy: function(params) {
    let { text, first, reverse } = params
    let filteredColl = new Backbone.Collection(this.models).models
    console.log(filteredColl)

    if (reverse) {
      console.log("JKLFJLFJKLE", this.filtered.params.reverse, reverse)
      filteredColl = filteredColl.reverse()
    }
    if (first) {
      filteredColl = filteredColl.slice(0, first)
    }
    if (text) {
      filteredColl = filteredColl.filter(todo =>
        todo
          .get("text")
          .toLowerCase()
          .includes(text.toLowerCase())
      )
    }
    console.log(filteredColl)
    console.log("---------------------------")
    this.filtered.params = params
    this.filtered.reset(filteredColl)
  },

  refilter: function() {
    this.filterBy(this.filtered.params)
  }
})

export default TodoCollection

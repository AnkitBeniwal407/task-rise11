const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [{
    toDo: {
      type: String,
      required: true,
    }
  }]
});

module.exports = mongoose.model("ToDo", toDoSchema);

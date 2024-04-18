const ToDoModel = require("../models/ToDoModel");

module.exports.getToDos = async (req, res) => {
  var userId = req.params.token;
  const toDos = await ToDoModel.findById(userId);
  if (!toDos) {
    res.json({ status: 'false' })
  }
  res.json({ status: 'true', toDos })
};


module.exports.saveToDo = async (req, res) => {
  try {
    const { toDo, userId } = req.body;
    var user = await ToDoModel.findById(userId)
    user.notes.push({ toDo });
    await user.save();
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.send({ error: err, msg: "Something went wrong!" });
  };
};

module.exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { toDo, userId } = req.body;
    var user = await ToDoModel.findById(userId);
    var element = user.notes.filter(({_id}) => id === _id.toString());
    var index = user.notes.indexOf(element[0]);
    user.notes[index].toDo = toDo;
    await user.save()
    res.send("Updated Successfully....");
  } catch (error) {
    console.log(error);
    res.send({ error: error, msg: "Something went wrong!" });
  }
};
 
module.exports.deleteToDo =async (req, res) => {
  const { id, userId } = req.params;

  try {
    var user = await ToDoModel.findById(userId);
    var element = user.notes.filter(({_id}) => id === _id.toString());
    var index = user.notes.indexOf(element[0]);
    user.notes.splice(index, 1);
    await user.save()
    res.send("Deleted Successfully....");
  } catch (err) { 
    console.log(err);
    res.send({ error: err, msg: "Something went wrong!" });
  }
};

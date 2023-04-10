const mongoose = require('mongoose');
//const { Schema } = mongoose;

const taskSchema = new mongoose.Schema ({
  text: String,
  id: Number
  //completed: false,
});

module.exports = mongoose.model('Task', taskSchema);

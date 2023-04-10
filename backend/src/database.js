const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const URI = 'mongodb://localhost:27017/tasksDB';

mongoose.connect(URI)
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

module.exports = mongoose;
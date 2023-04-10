// Express
const express = require("express");
const morgan = require('morgan')
const app = express()
const path = require ('path')
const createRoles = require ('./libs/initialSetup')
createRoles();

// Mongo + Mongoose
const { mongoose } = require('./database')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); 

// Routes
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));


// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Server
app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`);
})


//////////////////////////////////////


// Task.insertMany({text: 'Test'}, function(err){
//  if(err) {
//    console.log(err)
//  } else {
//    console.log("Succesfully added")
//  }
//})
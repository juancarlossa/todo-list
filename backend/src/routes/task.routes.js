const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const verifyToken = require('../middlewares/authJwt')


//CRUD HOME
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks)
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task)
})

router.post('/', verifyToken, async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text });
  await task.save();
  console.log(task);
  res.json({status: 'Task Saved'});
})

router.put('/:id', async (req, res) => {
  const { text } = req.body;
  const newTask = { text };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({status: 'Task updated'})
})

//delete all
router.delete('/', async (req, res) => {
  await Task.deleteMany();
  res.json({status: 'Tasks deleted'})
})

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({status: 'Task deleted'})
})


module.exports = router;
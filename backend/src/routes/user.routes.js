const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users)
});

router.delete('/', async (req, res) => {
  await User.deleteMany();
  res.json({status: 'Tasks deleted'})
})

module.exports = router;
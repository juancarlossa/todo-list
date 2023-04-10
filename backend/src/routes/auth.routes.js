
const config = require('../config');
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const verifyToken = require('../middlewares/authJwt')


//controllers

const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password)
    })

    if (roles){
      const foundRoles = await Role.find({name: {$in: roles}})
      newUser.roles = foundRoles.map(role => role.name)
    } else {
      const role = await Role.findOne({name: "user"})
      newUser.roles = [role.name];
    }

    const savedUser = await newUser.save();
    const token = jwt.sign({id: savedUser._id}, config, {
      expiresIn: 60
    })
    res.json({token})
    console.log(savedUser)
}

const signIn = async (req, res) => {

  const userFound = await User.findOne({email: req.body.email})

  if (!userFound) return res.status(400).json({message: "User not found"})
     
  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) return res.status(401).json({token: null, message: "Invalid password"})
      
  const token = jwt.sign({id:userFound._id}, config, {
    expiresIn: 3600
  })
  res.json({token})
}
//
//routes

router.post("/signup", signUp );

router.post("/signin", signIn);


module.exports = router;
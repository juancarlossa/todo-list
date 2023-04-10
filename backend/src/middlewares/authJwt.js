
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if(!token) return res.status(403).json({message: "No token provided"})

    const decoded = jwt.verify(token,config)
    req.userId = decoded.id;

    const user = await User.findById(req.userId, {password: 0})
    if (!user) return res.status(404).json({message: 'no user found'})

    next()
  } catch {
      return res.status(401).json({message: "Unauthorized"})
  }
}

module.exports = verifyToken
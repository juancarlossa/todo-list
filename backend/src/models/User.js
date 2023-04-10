const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique:true
  },
  email: {
    type: String,
    unique:true
  },
  password: {
    type: String,
    unique:true
  },
  roles: [{
    ref: "Role",
    type: String
  },],
  },
  {
    timestamps: true,
    versionKey: false,
  });

  //Anadir un salt a la password y hashear
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

//Compara la password del cliente con la del servidor
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model('User', userSchema);

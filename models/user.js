const mongoose = require('mongoose');
const menuSchema = require('./menu');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },


  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
   foodMenu: [menuSchema]
  }, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;

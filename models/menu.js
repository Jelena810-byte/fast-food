const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true 
  },
  portion: { 
    type:  String ,
    reqired: true 
  },

  photo: [
    {
      type: String,
      
    }
  ]
}, { timestamps: true }); 


const Menu = mongoose.model('Menu', menuSchema);

module.exports = menuSchema;

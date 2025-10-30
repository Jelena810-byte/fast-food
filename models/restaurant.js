    const mongoose = require('mongoose');

    const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    phone: { type: String }
    //   owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    //   }
    });

    module.exports = mongoose.model('Restaurant', restaurantSchema);

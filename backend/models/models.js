const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Username already taken"],
        required: [true, "Please enter a username"]
        
    },
    time: Number,
})

const User = mongoose.model('User', UserSchema);

module.exports = User;

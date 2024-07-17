const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        require: true,
        unique:true,
        trim:true
    },
    lastname:{
        type:String,
        require: true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        require: true,
        unique:true,
        trim:true
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;
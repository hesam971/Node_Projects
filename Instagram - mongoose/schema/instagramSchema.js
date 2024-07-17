const mongoose = require('mongoose');

const registerForm = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },lastname:{
        type:String,
        require:true
    },email:{
        type:String,
        require:true
    },password:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('registerForm',registerForm);
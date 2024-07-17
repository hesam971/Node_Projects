const mongoose = require('mongoose');

const addCatagory = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('addCatagory',addCatagory);
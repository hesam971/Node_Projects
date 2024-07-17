const mongoose = require('mongoose');

const addArticleComment = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    subtitle:{
        type:String,
        require:true
    },
    catagory:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    dataPublished:{
        type:Date,
        default:Date.now
    },
    comments:[{
        comment_subject:{
            type:String,
            require:true
        },
        comment_name:{
            type:String,
            require:true
        },
        comment_email:{
            type:String,
            require:true
        },
        comment_body:{
            type:String,
            require:true
        }
    }]
});

module.exports = mongoose.model('addArticleComment',addArticleComment);
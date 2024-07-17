const express = require('express');

const catagories = express.Router();

// databse config
const mongoose = require('../util/database');

// schema config
const addCatagory = require('../Schema/addCatagorySchema');
const ArticleComment = require('../Schema/addArticleCommentSchema');

catagories.get('/catagoriesList',(req,res,next) => {
    addCatagory.find({},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('catagoriesList',{result:result});
        }
    })
});

catagories.get('/eachCatagories/:id',(req,res,next) => {
 
            ArticleComment.find({catagory:req.params.id},(err,resu) => {
                if(err){
                    throw err;
                }else{
                    res.render('eachCatagories',{resu:resu});
                }
            })

});

catagories.get('/catagoriesDashboard',(req,res,next) => {
    addCatagory.find({},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('catagoriesDashboard',{result:result});
        }
    })
});

catagories.post('/catagoriesDashboard',(req,res,next) => {
    const {title,description} = req.body;
    if(!title || !description){
        res.render('addCatagory',{error:'fill all the inputs'});
    }else{
        const addComment = new addCatagory({title:title,description:description});
        addCatagory.insertMany(addComment,(err) => {
            if(err){
                throw err;
            }else{
                res.redirect('/catagoriesDashboard');
            }
        })
    }
});

catagories.get('/addCatagory',(req,res,next) => {
    res.render('addCatagory');
});

catagories.delete('/deleteCatagory/:id',(req,res,next) => {
    addCatagory.deleteOne({_id:req.params.id},(err) => {
        if(err){
            throw err;
        }else{
            res.sendStatus(200);
        }
    })
});

catagories.get('/editCatagory/:id',(req,res,next) => {
    addCatagory.find({_id:req.params.id},(err,result) =>{
        if(err){
            throw err;
        }else{
            res.render('editCatagory',{result:result});
        }
    })
});

catagories.post('/updateCatagory/:id',(req,res,next) => {
    const {title,description} = req.body;
    if(!title || !description){
        res.redirect('/editCatagory/' + req.params.id);
    }else{
        const updateCatagory = {
            title:title,
            description:description
        }
        addCatagory.updateMany({_id:req.params.id},{$set:updateCatagory},function(err){
            if(err){
                throw err;
            }else{
                res.redirect('/catagoriesDashboard');
            }
        })
    }
});

module.exports = catagories;
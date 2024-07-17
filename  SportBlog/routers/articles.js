const express = require('express');

const articles = express.Router();

// databse config
const mongoose = require('../util/database');

// Schemma config
const AddCatagry = require('../Schema/addCatagorySchema');
const ArticleComment = require('../Schema/addArticleCommentSchema');

articles.get('/eachArticlePage/:id',(req,res,next) => {
    ArticleComment.find({_id:req.params.id},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('eachArticlePage',{result:result,resu:result[0].comments});
        }
    })
});

articles.post('/articleAddComment/:id',(req,res,next) => {
    const {comment_subject,comment_name,comment_email,comment_body} = req.body;
    if(!comment_subject || !comment_name || !comment_email || !comment_body){
        res.redirect('/eachArticlePage/' + req.params.id);
    }else{
        const addComment = {
            comment_subject:comment_subject,
            comment_name:comment_name,
            comment_email:comment_email,
            comment_body:comment_body
        };
        ArticleComment.updateMany({_id:req.params.id},{$push:{comments:addComment}},(err) => {
            if(err){
                throw err;
            }else{
                res.redirect('/eachArticlePage/' + req.params.id);
            }
        })
    }
    
})

articles.get('/articlesList',(req,res,next) => {
    ArticleComment.find({},(err,result) =>{
        if(err){
            throw err;
        }else{
            res.render('articlesList',{result:result});
        }
    })
});

articles.get('/articlesDashboard',(req,res,next) => {
    ArticleComment.find({},(err,result) =>{
        if(err){
            throw err;
        }else{
            res.render('articlesDashboard',{result:result});
        }
    })
});

articles.get('/addArticles',(req,res,next) => {
    AddCatagry.find({},(err,result) =>{
        if(err){
            throw err;
        }else{
            res.render('addArticles',{result:result});
        }
    })
});

articles.post('/articlesDashboard',(req,res,next) => {
    const {title,subtitle,catagory,author,body} = req.body;
    if(!title || !subtitle || !catagory || !author || !body){
        res.render('addArticles',{error:'fill all the inputs'});
    }else{
        const articleAndComment = new ArticleComment({
            title:title,
            subtitle:subtitle,
            catagory:catagory,
            author:author,
            body:body
        })
        ArticleComment.insertMany(articleAndComment,function(err){
            if(err){
                throw err;
            }else{
                res.redirect('/articlesDashboard');
            }
        })
    }
});

articles.delete('/delete/:id',(req,res,next) => {
    ArticleComment.deleteOne({_id:req.params.id},(err) => {
        if(err){
            throw err;
        }else{
            res.sendStatus(200);
        }
    })
});

articles.get('/edit/:id',(req,res,next) => {
    ArticleComment.find({_id:req.params.id},(err,result) =>{
        if(err){
            throw err;
        }else{
            AddCatagry.find({},(err,results) =>{
                if(err){
                    throw err;
                }else{
                    res.render('editAticle',{result:result,resu:results});
                }
            })
        }
    })
});

articles.post('/updateArticlesDashboard/:id',(req,res,next) => {
    const {title,subtitle,catagory,author,body} = req.body;
    if(!title || !subtitle || !catagory || !author || !body){
        res.redirect('/edit/' + req.params.id);
    }else{
        const updateArticle = {
            title:title,
            subtitle:subtitle,
            catagory:catagory,
            author:author,
            body:body
        }
        ArticleComment.updateMany({_id:req.params.id},{$set:updateArticle},function(err){
            if(err){
                throw err;
            }else{
                res.redirect('/articlesDashboard');
            }
        })
    }
});


module.exports = articles;
const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/',(req,res)=>{
    res.render('home')
})

router.post('/',(req,res)=>{
    if(req.body._id == ''){
        const userData = {firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email}
        User.create(userData,(err,user)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/about')
                console.log(user)
            }
        })
    }else{
        User.findOneAndUpdate({_id:req.body._id},req.body,{useFindAndModify:false},(err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/about') 
                console.log('edit was seccessful')
            }
        })
    }
})

router.get('/about',(req,res)=>{
    User.find((err,doc)=>{
        if(err){
            console.log(err)
        }else{
            res.render('about',{user:doc})
        }
    })
})

router.get('/edit/:id',(req,res)=>{
    User.findById(req.params.id,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('we can edit our data')
            res.render('home',{firstname:data.firstname,lastname:data.lastname,email:data.email,id:data._id})
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id,{useFindAndModify:false},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('delete was seccessful')
            res.sendStatus(200)
        }
    })
})







module.exports = router;
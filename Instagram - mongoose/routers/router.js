const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

// mongoose config
const mongoose = require('../util/database');
const registerForm = require('../schema/instagramSchema');

router.get('/',(req,res,next) => {
    res.render('register');
});

router.post('/login',(req,res,next) => {
    const {username,lastname,email,password,confirmpassword} = req.body;
    if(!username || !lastname || !email || !password || !confirmpassword){
        res.render('register',{error:'fill all the inputs'});
    }else if( password.length < 6){
        res.render('register',{error:'password length should be 8 character'});
    }else if( password != confirmpassword){
        res.render('register',{error:'password should be same'});
    }else{
        registerForm.findOne({email:email},(err,result) => {
            if(err || result){
                res.render('register',{error:'email is already exist'});
            }else{
                bcrypt.hash(password,10,(err,hash) => {
                    if(err){
                        throw err;
                    }else{
                        const newData = new registerForm({
                            username:username,
                            lastname:lastname,
                            email:email,
                            password:hash
                        });
                        registerForm.insertMany(newData,(err) => {
                            if(err){
                                throw err;
                            }else{
                                res.render('login',{msg:'register was succesfully'})
                            }
                        })
                    }
                })
            }
        })
    }
});

router.get('/login',(req,res,next) => {
    res.render('login');
});

router.post('/dashbord',(req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.render('login',{error:'fill all the inputs'});
    }else{
        registerForm.findOne({email:email},(err,result) => {
            if(err || !result){
                res.render('login',{error:'email is not in database'});
            }else{
                bcrypt.compare(password,result['password'],(err,results) => {
                    if(err || !results){
                        res.render('login',{error:'password is not exist in database'});
                    }else{
                        registerForm.find({},(err,resu) => {
                            if(err){
                                throw err;
                            }else{
                                res.render('dashbord',{result:resu});
                            }
                        })
                    }
                })
            }
        })
    }
});

module.exports = router;
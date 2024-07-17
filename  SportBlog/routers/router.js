const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// databse config
const mongoose = require('../util/database');

// schema config
const ArticleComment = require('../Schema/addArticleCommentSchema');

router.get('/',(req,res,next) => {
    ArticleComment.find({},(err,result) =>{
        if(err){
            throw err;
        }else{
            res.render('home',{result:result});
        }
    });
});

router.get('/contactForm',(req,res,next) => {
    res.render('contactForm');
});

router.post('/contactForm',(req,res,next)=>{
    const {subject,name,email,message} = req.body;
    if(!subject || !name || !email || !message){
        res.render('contactForm',{error:'fill all the inputs'});
    }else{
        const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
        <li>fullName: ${req.body.subject}</li>
        <li>Email: ${req.body.name}</li>
        <li>phone-Nummber: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    
      // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '', // generated ethereal user
            pass: ''  // one-time password generated ethereal password
        },
        tls:{
        rejectUnauthorized:false
        }
    });
    
      // setup email data with unicode symbols
        let mailOptions = {
          from: '"Nodemailer Contact" ', // sender address
          to: '', // list of receivers,
          subject: 'Coustomer Request', // Subject line
          text: 'request from customer', // plain text body
          html: output // html body
    };
    
      // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.render('contactForm',{msg:info.messageId});
        });
    }
})

module.exports = router;
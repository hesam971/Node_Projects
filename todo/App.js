const express = require('express');
const bodtParser = require('body-parser');
const mongoose = require('mongoose');
const { static } = require('express');
const cors = require('cors')




// app init
const app = express();

// mongoDB init
const db = require('./config/key').mongooseUrl;
mongoose.connect(db,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('we have connection to our database')
}).catch(()=>{
    if(err){
        console.log(err)
    }
})

// cors init
app.use(cors())

//bodyParser init
app.use(bodtParser.json());
app.use(bodtParser.urlencoded({extended:false}));

//pug init
app.set('view engine','pug');

// publich init
app.use(express.static(__dirname + '/public'));

// router init
app.use('/',require('./route/router'))


// server init
const port = 8080;
const server = app.listen(port,()=>{
    console.log(`our localhost is ${port}`)
})
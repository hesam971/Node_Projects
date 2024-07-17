const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io')
const pug = require('pug');
const ejs = require('ejs');
const Nexmo = require('nexmo');


// app init
const app = express();

// view engine
app.set('view engine','html');
app.engine('html',pug.renderFile);

// body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// public config
app.use(express.static(__dirname + '/public'));

// nexmo cenfig
const nexmo = new Nexmo({
    apiKey: '',
    apiSecret: '',
  });

// view page
app.get('/',(req,res)=>{
    res.render('home')
})

// cathc request
app.post('/',(req,res)=>{
    const {number,text} = req.body;

    nexmo.message.sendSms(
        '01783714764',number,text,{type:'unicode'},
        (err,responseData)=>{
            if(err){
                console.log(err)
            }else{
                console.dir(responseData)

                //get data from response 
                const data = {
                    id:responseData.messages[0]['id-message'],
                    number:responseData.messages[0]['to']
                }

                //Emit to the client
                io.emit('smsStatus',data)
            }
        }
    )
})

// port config
const port = 8080;

const server = app.listen(port,()=>{
    console.log(`server port running in local ${port}`)
})

// socket.io config
const io = socketio(server);
io.on(/*connection*/'connect',(socket)=>{
    console.log('we have our connection to socket.io')
    io.on('disconnect',()=>{
        console.log('we are disconnect')
    })
})
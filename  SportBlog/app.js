const express = require('express');

const app = express();

// express body-parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// view engine ejs
app.set('view engine','ejs');

// css config
app.use('/css',express.static(__dirname+'/css'));

// router config
const router = require('./routers/router');
app.use('/',router);

const articles = require('./routers/articles');
app.use('/',articles);

const catagories = require('./routers/catagories');
app.use('/',catagories);

// express localhost config
const PORT = process.env.PORT || 8080;
app.listen(PORT,() => console.log(`localhost connected at port ${PORT}`));
const mysql = require('mysql2');

const pool = mysql.createConnection({
    host:'localhost',
    database:'psychologyblogs',
    user:'',
    password:''
});

pool.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('database connected');
    }
});

module.exports = pool;
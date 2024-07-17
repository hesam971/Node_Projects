const mysql = require('mysql2');

const pool = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'node-app',
    password:'1370abcdAB@'
});

pool.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('database connected');
    }
});

module.exports = pool;
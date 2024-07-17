const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://hesam971:1370abcdAB@test.0ephq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
then(() => {console.log('databse connected')}).
catch((err) => {throw err});

module.exports = db;
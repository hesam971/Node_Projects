const mongoose = require('mongoose');

const db = mongoose.connect('').
then(() => {console.log('databse connected')}).
catch((err) => {throw err;});

module.exports = db
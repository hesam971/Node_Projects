const mongoose = require('mongoose');

const db = mongoose.connect('').
then(() => {console.log('database connected')}).
catch((err) => { throw err});

module.exports = db;
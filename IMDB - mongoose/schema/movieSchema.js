const mongoose = require('mongoose');

const searchPlugin = require('mongoose-search-plugin');

const movieSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    releaseDate:{
        type:String,
        require:true
    },
    director:{
        type:String,
        require:true
    },
    gerne:{
        type:String,
        require:true
    },
    plot:{
        type:String,
        require:true
    },
    coverUrl:{
        type:String,
        require:true
    },
    trailerCode:{
        type:String,
        require:true
    },
});

movieSchema.plugin(searchPlugin, {
    fields: ['title']
});

module.exports = mongoose.model('movieSchema',movieSchema);
const express = require('express');

const router = express.Router();

// mongoose config
const mongoose = require('../util/database');
const movieSchema = require('../schema/movieSchema');


router.get('/',(req,res,next) => {
    res.render('home');
});

router.post('/search',(req,res,next) => {
    movieSchema.find({title:req.body.search},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('searchMovie',{result:result});
        }
    });
});

router.get('/movies',(req,res,next) => {
    movieSchema.find({},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('movies',{result:result});
        }
    });
});

router.post('/addMovies',(req,res,next) => {
    const {title,releaseDate,director,gerne,plot,coverUrl,trailerCode} = req.body;
    if(!title || !releaseDate || !director || !gerne || !plot || !coverUrl || !trailerCode){
        res.render('addMovie',{error:'fill all the inputs'});
    }else{
        const addSchema = new movieSchema({
            title:title,
            releaseDate:releaseDate,
            director:director,
            gerne:gerne,
            plot:plot,
            coverUrl:coverUrl,
            trailerCode:trailerCode
        });
        movieSchema.insertMany(addSchema,(err) =>{
            if(err){
                throw err;
            }else{
                res.redirect('/movies');
            }
        })
    }
});

router.get('/eachMoviesInfo/:id',(req,res,next) => {
    movieSchema.find({_id:req.params.id},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('eachMoviesInfo',{result:result});
        }
    })
});

router.get('/editMovie/:id',(req,res,next) => {
    movieSchema.find({_id:req.params.id},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('editMovie',{result:result});
        }
    })
});

router.delete('/deleteMovie/:id',(req,res,next) => {
    movieSchema.deleteOne({_id:req.params.id},(err) => {
        if(err){
            throw err;
        }else{
            res.sendStatus(200);
        }
    })
});

router.post('/updateMovie/:id',(req,res,next) => {
    const {title,releaseDate,director,gerne,plot,coverUrl,trailerCode} = req.body;
    if(!title || !releaseDate || !director || !gerne || !plot || !coverUrl || !trailerCode){
        res.redirect('/editMovie/' + req.params.id);
    }else{
        const addSchema = {
            title:title,
            releaseDate:releaseDate,
            director:director,
            gerne:gerne,
            plot:plot,
            coverUrl:coverUrl,
            trailerCode:trailerCode
        };
        movieSchema.updateMany({_id:req.params.id},addSchema,(err) =>{
            if(err){
                throw err;
            }else{
                res.redirect('/movies');
            }
        })
    }
});

router.get('/addMovie',(req,res,next) => {
    res.render('addMovie');
});

router.get('/moviesGerne/Action',(req,res,next) => {
    movieSchema.find({gerne:"Action"},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('moviesGerne',{result:result});
        }
    });
});

router.get('/moviesGerne/Comedy',(req,res,next) => {
    movieSchema.find({gerne:"Comedy"},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('moviesGerne',{result:result});
        }
    });
});

router.get('/moviesGerne/Drama',(req,res,next) => {
    movieSchema.find({gerne:"Drama"},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('moviesGerne',{result:result});
        }
    });
});

router.get('/moviesGerne/Documentary',(req,res,next) => {
    movieSchema.find({gerne:"Documentary"},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('moviesGerne',{result:result});
        }
    });
});

router.get('/moviesGerne/Horror',(req,res,next) => {
    movieSchema.find({gerne:"Horror"},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('moviesGerne',{result:result});
        }
    });
});

router.get('/moviesGerne/Thriller',(req,res,next) => {
    movieSchema.find({gerne:"Thriller"},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('moviesGerne',{result:result});
        }
    });
});

router.get('/moviesGerne/Other',(req,res,next) => {
    movieSchema.find({gerne:"Other"},(err,result) => {
        if(err){
            throw err;
        }else{
            res.render('moviesGerne',{result:result});
        }
    });
});

module.exports = router;
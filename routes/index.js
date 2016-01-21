var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var router = express.Router();

var User = require('../models/user');
var Agenda = require('../models/agenda.js');
var mongoose = require('mongoose');



router.get('/', function(req, res){
    res.render('index.hbs', {successMessage: req.flash('successMessage'), infoMessage: req.flash('infoMessage') }); 
});

router.get('/login', function(req, res){
    res.render('login.hbs', {message: req.flash('loginMessage')}); 
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/agendas',
    failureRedirect: '/login',
    failureFlash: true
    }
));

router.get('/signup', function(req, res){
    res.render('signup.hbs', {message: req.flash('signupMessage')}); 
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/agendas', /*isLoggedIn,*/ function(req, res){
    var agendaCount = 0

    Agenda.count({ color: 'black' }, function(err, count){
      console.log(count);  
    })
    Agenda.count({ "owner": req.user._id }, function(err, count){
        if(err) console.log(err);
        if(count > 0){
        res.render('agendas/agendas.hbs', {
            user: req.user, //Get the user and pass to template   
            layout: 'app_layout',
            title: 'Home'
            });
        }else{
            res.redirect('/new_agenda');
        }
    });
   
    
    
    
}); 

router.get('/new_agenda', function(req, res){
    res.render('agendas/new_agenda.hbs', {
        user: req.user, //Get the user and pass to template   
        layout: 'app_layout',
        title: 'Home'
    }); 
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('successMessage', 'Logged Out')
    res.redirect('/');
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    
    //Else Redirect
    req.flash('infoMessage', 'You do not have access to this page.')
    res.redirect('/');
}



module.exports = router;

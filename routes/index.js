var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var router = express.Router();

var User = require('../models/user');

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
    successRedirect: '/agendas',
    failureRedirect: '/signup',
    failureFlash: true
}));

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

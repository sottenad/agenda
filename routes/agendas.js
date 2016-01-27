var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var router = express.Router();

var Agenda = require('../models/agenda.js');

/* ========================================================= */
/* Index  ================================================== */
/* ========================================================= */

router.get('/', isLoggedIn, function(req, res){
    //CustphoneSchema.findOne({}).populate('subdomain').exec(function(err, custPhone) { 
    Agenda.find({owner : req.user._id }).populate('events').exec(function(err, agendas){
        if(err) console.log(err);
        if(agendas.length > 0){
            res.render('agendas/index.hbs', {
                agendas: agendas,
                user: req.user, //Get the user and pass to template   
                layout: 'app_layout',
                title: 'Home'
            });
        }else{
            res.redirect('/agendas/new');
        }
    });
}); 

/* ========================================================= */
/* New    ================================================== */
/* ========================================================= */

router.get('/new', isLoggedIn, function(req, res){
    res.render('agendas/new.hbs', {
        user: req.user, //Get the user and pass to template   
        layout: 'app_layout',
        title: 'Home'
    }); 
});

/* ========================================================= */
/* Detail ================================================== */
/* ========================================================= */

router.get('/:agenda_id', isLoggedIn, function(req, res){
    
    Agenda.findById(req.params.agenda_id).populate('events').exec(function(err, foundAgenda){
        if(err) res.send(err);
        res.render('agendas/detail.hbs', {
            agenda: foundAgenda,
            user: req.user, //Get the user and pass to template   
            layout: 'app_layout',
            title: 'Agenda Detail'
        }); 
    });
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    
    //Else Redirect
    req.flash('infoMessage', 'You do not have access to this page.')
    res.redirect('/');
}


module.exports = router;
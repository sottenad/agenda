var Agenda = require('../models/agenda');
var Event = require('../models/event');
var Guest = require('../models/guest');

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

/* Set global routing logging */
router.use(function(req, res, next) {
    // do logging
    console.log('Serving API Traffic');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET home page. */ 
router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });   
});


/* ================================================================= */
/* ======================= Agendas ================================= */

router.route('/agendas')
    //Make a new agenda
    .post(isLoggedIn, function(req, res){
        var agenda = new Agenda();
        agenda.name = req.body.name;
        agenda.description = req.body.description;
        agenda.owner = req.user._id;

        agenda.save(function(err){
            if(err) res.send(err);
            res.json({message: agenda});
        });
    })
    //Get all agendas
    .get(function(req,res){
        Agenda.find(function(err, agendas){
            if(err) res.send(err);
            res.json(agendas);
        });
    });

router.route('/agendas/:agenda_id')
    //Get the agenda with this ID
    .get(function(req,res){
        Agenda.findById(req.params.agenda_id, function(err, agenda){
            if(err) res.send(err);
            res.json(agenda);
        });
    })
    //Update the agenda with this id
    .put(function(req, res){
        Agenda.findById(req.params.agenda_id, function(err, agenda){
            if(err) res.send(err);

            agenda.name = req.body.name;
            agenda.save(function(err){
                if(err) res.send(err);
                res.json({message: 'Success!', agenda: agenda});
            });
        });
    })
    //Delete an agenda
    .delete(function(req, res){
        Agenda.remove({ 
            _id: req.params.agenda_id 
        },function(err, agenda){
            if(err) res.send(err);
            res.json({message: 'Successfully Deleted'});
        });
    });

/* =============================================================== */
/* ======================== Events =============================== */
router.route('/events')
    //Make a new agenda
    .post(isLoggedIn, function(req, res){
        console.log('agenda: '+req.body.agenda);
    
        var event = new Event();
        event.name = req.body.name;
        event.startTime = req.body.startTime;
        event.endTime = req.body.endTime;
        event.description = req.body.description;
        event.location = req.body.location;
        event.agenda = req.body.agenda;
        event.owner = req.user._id;
        
        event.save(function(err, event){
            if(err) res.send(err);
            
            Agenda.findById(event.agenda, function(err, agenda){
                agenda.events.push(event._id);
                agenda.save(function(err){
                    if(err) console.log(agenda);
                    console.log(agenda);
                })
            })
            res.json({message: event});
        });
    })
    //Get all agendas
    .get(function(req,res){
        Event.find(function(err, events){
            if(err) res.send(err);
            res.json(events);
        });
    });

router.route('/events/:event_id')
    //Get the agenda with this ID
    .get(function(req,res){
        Event.findById(req.params.event_id, function(err, event){
            if(err) res.send(err);
            res.json(event);
        });
    })
    //Update the agenda with this id
    .put(function(req, res){
        Event.findById(req.params.event_id, function(err, event){
            if(err) res.send(err);
            event.name = req.body.name;
            event.startTime = req.body.startTime;
            event.endTime = req.body.endTime;
            event.description = req.body.description;
            event.location = req.body.location;
            event.agenda = req.body.agenda;
            event.owner = req.user._id;
            
            event.save(function(err){
                if(err) res.send(err);
                res.json({message: 'Success!', event: event});
            });
        });
    })
    //Delete an agenda
    .delete(function(req, res){
        Event.remove({ 
            _id: req.params.event_id 
        },function(err, event){
            if(err) res.send(err);
            res.json({message: 'Successfully Deleted'});
        });
    });

/* =============================================================== */
/* ======================== Guests =============================== */
router.route('/guests')
    //Make a new agenda
    .post(isLoggedIn, function(req, res){
        var guest = new Guest();
        guest.name = req.body.name;
        guest.email = req.body.email;
        guest.agenda = req.body.agenda;
        
        guest.save(function(err){
            if(err) res.send(err);
            res.json({message: guest});
        });
    })
    //Get all agendas
    .get(function(req,res){
        Guest.find(function(err, guests){
            if(err) res.send(err);
            res.json(guests);
        });
    });

router.route('/guests/:guest_id')
    //Get the agenda with this ID
    .get(function(req,res){
        Guest.findById(req.params.guest_id, function(err, guests){
            if(err) res.send(err);
            res.json(guests);
        });
    })
    //Update the agenda with this id
    .put(function(req, res){
        Guest.findById(req.params.guest_id, function(err, guest){
            if(err) res.send(err);
            guest.name = req.body.name;
            guest.email = req.body.email;
            guest.agenda = req.body.agenda;
            
            guest.save(function(err){
                if(err) res.send(err);
                res.json({message: 'Success!', guest: guest});
            });
        });
    })
    //Delete an agenda
    .delete(function(req, res){
        Guest.remove({ 
            _id: req.params.guest_id 
        },function(err, guest){
            if(err) res.send(err);
            res.json({message: 'Successfully Deleted'});
        });
    });




function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    
    //Else Redirect
    req.flash('infoMessage', 'You do not have access to this page.')
    res.redirect('/');
}

module.exports = router;

 
 
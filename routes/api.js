var Agenda = require('../models/agenda');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/agenda-test'); 

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


router.route('/agendas')
    //Make a new agenda
    .post(function(req, res){
        var agenda = new Agenda();
        agenda.name = req.body.name;
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

module.exports = router;
 
 
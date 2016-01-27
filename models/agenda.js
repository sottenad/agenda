var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Event = require('./event');
var Guest = require('./guest');

var ObjectId = Schema.ObjectId;

var AgendaSchema   = new Schema({
    name: String,
    startTime: Date,
    endTime: Date,
    description: String,
    events: [{type: ObjectId, ref: 'Event'}],
    guests: [{type: ObjectId, ref: 'Guest'}],
    owner: String
});

module.exports = mongoose.model('Agenda', AgendaSchema);
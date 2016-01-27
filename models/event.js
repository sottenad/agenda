var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AgendaSchema = require('./agenda');

var EventSchema   = new Schema({
    name: String,
    startTime: Date,
    endTime: Date,
    description: String,
    location: String,
    agenda: { type: ObjectId, ref: 'AgendaSchema' },
    owner: String
});

module.exports = mongoose.model('Event', EventSchema);
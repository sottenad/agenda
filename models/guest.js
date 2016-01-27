var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Agenda = require('./agenda');

var ObjectId = Schema.ObjectId;

var GuestSchema   = new Schema({
    name: String,
    email: String,
    agenda: [{ type: ObjectId, ref: 'Agenda' }]
});

module.exports = mongoose.model('Guest', GuestSchema);
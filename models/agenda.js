var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AgendaSchema   = new Schema({
    name: String,
    startTime: Date,
    endTime: Date,
    description: String,
    owner: String
});

module.exports = mongoose.model('Agenda', AgendaSchema);
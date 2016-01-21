var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    name: String,
    startTime: Date,
    endTime: Date,
    description: String,
    location: String,
    owner: String
});

module.exports = mongoose.model('Event', EventSchema);
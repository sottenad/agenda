var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GuestSchema   = new Schema({
    name: String,
    email: String,
    owner: String
});

module.exports = mongoose.model('Guest', GuestSchema);
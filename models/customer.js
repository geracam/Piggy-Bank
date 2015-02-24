// customer.js: Gerardo Camarena Gomez
// loads the fields of an user for stripe

// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// make the schema for the customer
var Customer = new Schema({
  token: String,
  time: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Customer', Customer);
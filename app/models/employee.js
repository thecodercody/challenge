var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema ({
  fName: String,
  lName: String,
  tel: String,
  email: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);
// server.js

// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/qOwaby7w'); // connect to our database


// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var Employee = require('./app/models/employee');
// configure app to use bodyParser()
// this will let us get the data from a POST
var http = require('http');                                             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override');
var path = require('path');
app.use(express.static(path.join(__dirname, '/client')));              

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());



var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res, next) {
  //do logging
  console.log('Something is happening.');
  next(); //make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here


//on routes that end in /employees
//---------------------------------------------------------------------------------------
router.route('/employees')

  //create a employee (accessed at POST http://localhost:8080/api/employees)
  .post(function(req, res) {
      var employee = new Employee();
      employee.fName = req.body.fName;
      employee.lName = req.body.lName;
      employee.tel = req.body.tel;
      employee.email = req.body.email;

      //save the employee and check for errors
      employee.save(function(err){
        if(err) res.send(err);
        
        res.json({ "message": 'Employee created!' });
      });
  })

  .get(function(req, res) {
    Employee.find(function(err, employees) {
      if(err)
        res.send(err);

      res.json(employees);
    });
  });

//on routes that end in employees/:employee_id
//------------------------------------------------------------------------------------------

router.route('/employees/:employee_id')

  //get the employee associated with that id (accessed at http://localhost:8080/api/employees/:employee_id)
  .get(function(req, res) {
    Employee.findById(req.params.employee_id, function(err, employee) {
      if(err)
        res.send(err);
      res.json(employee);
    });
  })

  .put(function(req, res) {
    Employee.findById(req.params.employee_id, function(err, employee) {
      if(err)
        res.send(err);

      employee.fName = req.body.fName;
      employee.lName = req.body.lName;
      employee.tel = req.body.tel;
      employee.email = req.body.email;

      employee.save(function(err) {
        if(err)
          res.send(err);

        res.json({ message: 'employee updated!' });
      });
    });
  })

  .delete(function(req, res) {
    Employee.remove({
      _id: req.params.employee_id
    }, function(err, employee) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  })
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
// 

app.get('*', function(req, res) {
  res.sendfile('./index.html');
});

app.listen(port);
console.log('Magic happens on port ' + port);
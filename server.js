var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');

var bodyParser = require('body-parser');
var cors = require('cors');
var databaseConfig = require('./config/database');
var router = require('./app/routes');




mongoose.connect(databaseConfig.url);

 
app.listen(process.env.PORT || 9090);
console.log("App listening on port 9090");
//app.use(express.favicon());
//app.use(express.logger('dev'));

//app.use(express.methodOverride());

app.use(bodyParser.urlencoded({limit: '10mb', extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json({limit: '50mb'})); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
 
router(app);

  
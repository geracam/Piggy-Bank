// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter');
var GoogleStrategy = require('passport-google');
var FacebookStrategy = require('passport-facebook');

// config file containing private info
//var config = require('./config.js');

// helper functions for passport
//var funct = require('./functions.js');

//==========EXPRESS=============
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session middleware
app.use(function(req, res, next){
	var err = req.session.error;
	var msg = req.session.notice;
	var success = req.session.success;

	delete req.session.error;
	delete req.session.success;
	delete req.session.notice;

	if (err) res.locals.error = err;
	if (msg) res.locals.notice = msg;
	if (success) res.locals.success = success;

	next();
})


app.use(express.static(path.join(__dirname, 'public')));


// Set server port
app.listen(3000);
console.log('server is running');



// set variables for environment
var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
var app = express();

mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/loginPage')));
app.use(express.static(path.join(__dirname, 'views/profilePage')));


// Set server port
app.listen(3000);
console.log('server is running');



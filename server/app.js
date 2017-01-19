var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
const passport = require('passport');
const expressSession = require('express-session');
const config = require('./config/config');
const favicon = require('express-favicon');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// initialize passport
app.use(expressSession({secret: config.secret,
    name: "jspratiche",
//  store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: false,
    saveUninitialized: false,
	/*cookie: { secure: true }*/
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
var initPassport = require('./helpers/passport');
initPassport(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'client', 'imgs', 'favicon.ico')));


// setup config object
config.app = app;
config.deps = {};
config.deps.express = express;
config.deps.passport = passport;
config.deps.sql = require('./helpers/db.js');
config.deps.rest = require('./helpers/rest.js');


// routes
require('./routes/index')(config, './server/routes');


// 500 development error handler, will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
// 500 production error handler, no stacktraces leaked to user
else {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}
module.exports = app;

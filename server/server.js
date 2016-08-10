//dependencies

var express 			= require('express'),
	app 				= express(),
	port 				= process.env.PORT || 9000,
	cookieParser 		= require('cookie-parser'),
	session 			= require('express-session'),
	morgan 				= require('morgan'),
	mongoose 			= require('mongoose'),
	bodyParser 			= require('body-parser'),
	passport 			= require('passport'),
	flash 				= require('connect-flash'),
	path 				= require('path'),
	busboyBodyParser 	= require('busboy-body-parser');



//mongoose
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

//app intialize dependencies
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended: true}));
app.use(busboyBodyParser());
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

app.use(express.static(path.join(__dirname, '../client'))); //connect to Angular client
//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//authorization route
var public = express.Router();
require('./routes/public.js')(public, passport);
app.use('/public', public);
//secure route
var private = express.Router();
require('./routes/private.js')(private);
app.use('/', private);

app.listen(port);
console.log('Server running on port: ' + port);




const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const app = express();
const http = require('http').Server(app);
const session = require('express-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({cookie: {maxAge: 60000}, resave: false, saveUninitialized: true, secret: 'graph'}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
app.use('/', index);

http.listen(3000, function() {
	console.log('Server listening on *:3000');
});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require("express-handlebars");
var sessions = require('express-session');
var mysqlSession = require('express-mysql-session')(sessions);
var flash = require('express-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');

var app = express();

// view engine setup
const hbs = handlebars.create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  extname: ".hbs",
  defaultLayout: "home",
});

app.engine("hbs", hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mysqlSessionStore = new mysqlSession(
  {
  /* empty means using default options*/
  }, 
  require('./config/database')
);

app.use(sessions({
  key : "somethingrandom",
  secret: "something even more random",
  store: mysqlSessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use( (req, res, next) => 
{
    console.log(req.session);
    if(req.session.username)
    {
        res.locals.logged = true;
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;

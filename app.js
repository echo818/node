var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//------------------------------------------------
//采用connect-mongodb中间件作为session存储
//------------------------------------------------
var session = require('express-session');
var settings = require('./database/settings');
var MongoStore = require('connect-mongodb');
var db = require('./database/session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//------------------------------------------------
//修改ejs模板引擎
//------------------------------------------------
// app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
//------------------------------------------------
//session配置
//------------------------------------------------
app.use(session({
    cookie: {
        maxAge: 600000
    },
    secret: settings.COOKIE_SECRET,
    store: new MongoStore({
        username: settings.USERNAME,
        password: settings.PASSWORD,
        url: settings.URL,
        db: db
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
//------------------------------------------------
//新添加的路由
//------------------------------------------------
app.use('/login', routes);
app.use('/logout', routes);
app.use('/home', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: '错误页面',
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: '错误页面',
        message: err.message,
        error: {}
    });
});


module.exports = app;

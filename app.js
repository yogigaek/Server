var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const {decodeToken} = require('./middlewares/auth')
const user = require('./routes/user.route')
const product = require('./routes/product.route')
const category = require('./routes/category.route')
const tag = require('./routes/tag.route')
const shippingAddress = require('./routes/shippingAddress.route')
const cart = require('./routes/cart.route')
const order = require('./routes/order.route')
const invoice = require('./routes/invoice.route')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(decodeToken())

app.use('/auth', user)
app.use('/api', product)
app.use('/api', category)
app.use('/api', tag)
app.use('/api', shippingAddress)
app.use('/api', cart)
app.use('/api', order)
app.use('/api', invoice)

app.use('/',(req, res) => {
  res.render('index', {
    title: 'POS API Server'
  })
});

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
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var icecreamRouter = require('./routes/icecream');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var icecream = require("./models/icecream");
var resourceRouter = require('./routes/resource');

require('dotenv').config();
const connectionString = process.env.MONGO_CON
var mongoose = require('mongoose')
mongoose.connect(connectionString);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/icecream', icecreamRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);
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

var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});


//each of the resource endpoints. At the moment, they are just stubs
// We can seed the collection if needed on
//server start
async function recreateDB(){
// Delete everything
await icecream.deleteMany().maxTimeMS(20000);


let instance1 = new icecream({FLAVOUR:"Chocolate", SERVING_SIZE:'2', CALORIES_PER_SERVING:10});
instance1.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});

let instance2 = new icecream({FLAVOUR:"Vanilla", SERVING_SIZE:'3', CALORIES_PER_SERVING:20});
instance2.save().then(doc=>{
console.log("Second object saved")}
).catch(err=>{
console.error(err)
});

let instance3 = new icecream({FLAVOUR:"Strawberry", SERVING_SIZE:'4', CALORIES_PER_SERVING:30});
instance3.save().then(doc=>{
console.log("Third object saved")}
).catch(err=>{
console.error(err)
});
}
let reseed = true;
if (reseed) {recreateDB();}

module.exports = app;

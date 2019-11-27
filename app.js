const express = require('express');
const bodyParser=require('body-parser')
const morgan = require('morgan')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');
require('dotenv').config();
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const expressValidator = require('express-validator');
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
//static folder

app.use(express.static('public'));
app.use(morgan('tiny'));


//ejs 
app.use(expressLayouts);
app.set('view engine', 'ejs');

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes
app.use('/', require('./routes/index.js'));

// Bring in routes 
const contact = require('./routes/index.js');
// Use Routes
app.use('/contact', contact);

app.listen(port, () => {
console.log(`listening on port ${port}`)
})
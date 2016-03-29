var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

var port = process.env.PORT || 8000;
var MONGO_URI = process.env.IP + "/imageabstraction";

app.use(morgan('combined'));

// DB connnection
mongoose.connect(MONGO_URI);

// public folder
app.use(express.static(__dirname + '/public'));

// template engine
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

// routes ORDER IS IMPORTANT!

app.use('/api', api);
app.use('/', index);

app.listen(port, function() {
    console.log('running on port: ' + port);
})
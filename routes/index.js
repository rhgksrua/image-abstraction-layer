'use strict';

var express = require('express');
var router = express.Router();

var Searched = require('../models/Searched');

router.get('/', indexController);

/**
 * indexController
 * Serves index page
 */ 
function indexController(req, res) {
    res.render('index', {host: req.hostname});
}
module.exports = router;
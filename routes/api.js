'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();
//var validateUrl = require('../helpers/validateUrl');
//var saveAndGenerate = require('../helpers/saveAndGenerate');

var Searched = require('../models/Searched');
var buildQuery = require('../helpers/buildQuery');
var saveSearchedTerm = require('../helper/saveSearchedTerm');

router.get('/', indexController);

router.get('/imagesearch/:term', imageSearchController);

router.get('/latest/imagesearch', latestController);

function indexController(req, res) {
    // index should show basic instructions
    res.render('index', {host: req.hostname});
}

function imageSearchController(req, res) {
    var searchTerm = req.params.term;
    var offset = req.query.offset || 0;
    var apiUrl = buildQuery(searchTerm, offset);
    
    saveSearchedTerm(searchTerm);
    
    var error = {error: 'error'};
    
    request(apiUrl, function(err, response, body) {
        if (err) {
            return res.json(error);
        }
        
        if (response.statusCode >= 300) {
            return res.json(error);
        }
        
        if (response.statusCode < 300 && response.statusCode >= 200) {
            return res.send(body);
        }
        
    });
    
}

/**
 * latestController
 * Returns list of last 10 searched terms in JSON
 * 
 * @return response JSON
 */
function latestController(req, res) {
    res.json({});
    
}

module.exports = router;
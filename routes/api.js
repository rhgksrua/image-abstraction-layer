'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

// Mongoose
var Searched = require('../models/Searched');

// helper functions
var buildQuery = require('../helpers/buildQuery');
var saveSearchedTerm = require('../helpers/saveSearchedTerm');
var retrieveHistoryPromise = require('../helpers/retrieveHistory');

router.get('/', indexController);
router.get('/imagesearch/:term', imageSearchController);
router.get('/latest/imagesearch', latestController);

function indexController(req, res) {
    // index should show basic instructions
    res.render('index', {host: req.hostname});
}

function imageSearchController(req, res) {
    console.log('inside');
    var searchTerm = req.params.term;
    var offset = req.query.offset || 0;
    var apiUrl = buildQuery(searchTerm, offset);
    
    saveSearchedTerm(searchTerm);
    
    var error = {error: 'error'};
    var options = {
        auth: {
            user: '',
            pass: process.env.API_KEY
        },
        headers: {
            'User-Agent': 'image-abstraction-layer-app'
        }
    };
    
    request(apiUrl, options, function(err, response, body) {
        if (err) {
            return res.json(error);
        }
        if (response.statusCode >= 300) {
            return res.json(error);
        }
        if (response.statusCode < 300 && response.statusCode >= 200) {
            var parsed = JSON.parse(body).d.results.map(function(el) {
                return {
                        url: el.MediaUrl,
                        snippet: el.Title,
                        thumbnail: el.Thumbnail.MediaUrl,
                        context: el.SourceUrl
                };
            });
            return res.json(parsed);
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
    var result = retrieveHistoryPromise();
    result.then(function(terms) {
        res.json(terms);
    });
}

module.exports = router;
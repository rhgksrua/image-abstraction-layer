'use strict';

var express = require('express');
var router = express.Router();

var Searched = require('../models/Searched');

router.get('/', indexController);
router.get('/:short', redirectController);
router.get('/:short/count', urlInfoController);

function indexController(req, res) {
    res.render('index', {host: req.hostname});
    
}

/**
 * redirectController. Handles redirects and 
 * updates number of times shortener has been clicked.
 * 
 * @param request req
 * @param response res
 * 
 * @return response
 */
function redirectController(req, res) {
    
    // updates model and redirect users
    Url.findOneAndUpdate({short: req.params.short}, {$inc: {count: 1}}, function(err, url) {
        if (err) {
            return res.json({error: 'db error'});
        }
        return res.redirect(url.original_url);
    });
}

function urlInfoController(req, res) {
    Url.findOne({short: req.params.short}, function(err, url) {
        if (err) {
            return res.json({error: 'db error'});
        }
        var info = {
            count: url.count,
            url: url.original_url,
            short: url.short,
            shortUrl: url.short_url
        };
        return res.render('info', info);
    });
}

module.exports = router;
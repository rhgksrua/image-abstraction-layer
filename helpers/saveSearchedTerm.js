'use strict';

var Searched = require('../models/Searched');

function saveSearchedTerm(term) {
    var saveTerm = {
        term: term
    };
    
    var searched = new Searched(saveTerm);
    
    searched.save(function(err, savedTerm) {
        if (err) {
            console.error(err);
            return err;
        }
        console.log('saved', savedTerm);
    });
}

module.exports = saveSearchedTerm;
'use strict';

var Searched = require('../models/Searched');

/**
 * retrieveHistory
 * returns last 10 queries and returns a promise.
 * 
 * @param
 * 
 * @return promise
 */
function retrieveHistory() {
    var promise = Searched
        .find()
        .limit(10)
        .sort({date: -1})
        .exec(function(err, terms) {
            if (err) {
                console.log(err);
            }
            return terms;
        })
        .then(function(terms) {
            return terms.map(function(el) {
                return {
                    term: el.term,
                    date: el.date
                };
            });
        });
    return promise;
}

module.exports = retrieveHistory;
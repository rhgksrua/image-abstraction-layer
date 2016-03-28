var shortid = require('shortid');
var Url = require('../models/Url');

function saveAndGenerate(origUrl, protocal, hostname, res) {
    
    var short = shortid.generate();
    var shortUrl = protocal + "://" + hostname + "/" + short;
    
    var saving = {
        original_url: origUrl,
        short: short,
        short_url: shortUrl
    };
    
    var url = new Url(saving);
    
    url.save(function(err, saved) {
        if (err) {
            return res.json({error: 'db error'});
        }
        var json = {
            original_url: origUrl,
            short_url: shortUrl
        };
        return res.json(json);
    });
}


module.exports = saveAndGenerate;
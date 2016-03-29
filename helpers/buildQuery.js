'use strict';

/**
 * buildQuery. Creates url for api request
 * 
 * @param string term Term to search
 * @param number offset Offset for search result
 * 
 * @return string url built based on term and offset
 */
function buildQuery(term, offset) {
    var num = 10;
    offset = offset * num || 0;
    
    var url = "https://api.datamarket.azure.com/Bing/Search/Image";
    url += "?Query=%27" + term + "%27";
    url += "&$format=json";
    url += "&$top=" + num;
    url += "&$skip=" + offset;
    
    console.log(url);
    
    return url;
}

module.exports = buildQuery;
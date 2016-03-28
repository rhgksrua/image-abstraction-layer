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
    offset = offset || 0;
    var url = "http://api.bing.net/json.aspx?";
    url += "AppId" + process.env.API_KEY;
    url += "&Query=" + term;
    url += "&Image.Count=10";
    url += "&Image.Offset=" + offset;
    
    return url;
}
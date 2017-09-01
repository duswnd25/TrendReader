// TODO 변경필요
const rootUrl = 'https://blog.tyle.io/';

// Module
const request = require('request');
const cheerio = require('cheerio');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        let $ = cheerio.load(body);

        // Title
        let blogName = $('title').eq(0).text().substring(0, 20);

        // Article
        let articleItem = $('div#posts-list').eq(0).children('a').eq(0);

        // Title
        let parseTitle = articleItem.children('span.post-subject').text();
        let parseLink = articleItem.attr('href');
        parseLink = rootUrl + parseLink;

        // Summary
        let parseSummary = articleItem.children('span.post-content').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;

        rootCallback(result);
    });
};

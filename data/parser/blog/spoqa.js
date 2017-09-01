// TODO 변경필요
const rootUrl = 'https://spoqa.github.io/';

// Module
const cheerio = require('cheerio');
const request = require('request');

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
        let articleItem = $('li.post-item').eq(0).children('div.post-author-info').eq(0);

        // Title
        let titleItem = articleItem.children('h2.post-title').eq(0).children('a').eq(0);
        let parseTitle = titleItem.children('span.post-title-words').eq(0).text();
        let parseLink = titleItem.attr('href');

        // Summary
        let parseSummary = articleItem.children('p.post-description').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.title = parseTitle;
        result.link = rootUrl + parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;

        rootCallback(result);
    });
};
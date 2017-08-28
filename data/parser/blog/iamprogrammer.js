// TODO 변경필요
const rootUrl = 'https://iamprogrammer.io/';

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
        let articleItem = $('article').eq(0);

        // Title
        let titleItem = articleItem.children('header').eq(0).children('h2').eq(0).children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');

        // Summary
        let parseSummary = articleItem.children('div.entry-content').eq(0).text().replace(/<[^>]+>/g, '');

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};
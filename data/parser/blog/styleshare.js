// TODO 변경필요
const rootUrl = 'https://styleshare.github.io';

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

        // Name
        let blogName = $('title').eq(0).text();

        // Article
        let articleItem = $('ul.post-list').eq(0).children('li').eq(0);

        // Title
        let titleItem = articleItem.children('h2').eq(0)
            .children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');
        parseLink = rootUrl + parseLink;

        // Summary
        let parseSummary = articleItem.children('p').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.title = parseTitle;
        result.link = rootUrl + parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
        result.category = ['company', 'tech'];

        rootCallback(result);
    });
};
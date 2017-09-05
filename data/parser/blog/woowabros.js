// TODO 변경필요
const rootUrl = 'http://woowabros.github.io/';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        let result = resultItem.getResultItem();
        if (body) {
            let $ = cheerio.load(body);

            // Name
            let blogName = $('title').eq(0).text();

            // Article
            let articleItem = $('div.list-module').eq(0);

            // Title
            let titleItem = articleItem.children('a').eq(0);
            let parseTitle = titleItem.children('h2.post-link').eq(0).text();
            let parseLink = titleItem.attr('href');

            // Summary
            let parseSummary = titleItem.children('p.post-description').eq(0).text();

            // Result
            result.name = blogName;
            result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.title = parseTitle;
            result.link = rootUrl + parseLink;
            result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
            result.category = ['company', 'tech'];

            rootCallback(result);
        } else {
            result.name = "";
            rootCallback(result);
        }
    });
};
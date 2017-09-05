// TODO 변경필요
const rootUrl = 'http://engineering.vcnc.co.kr';

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
            let articleItem = $('ul.archive').eq(0).children('li').eq(0).children('a').eq(0);

            let parseTitle = articleItem.text();
            let parseLink = articleItem.attr('href');
            parseLink = rootUrl + parseLink;

            // Summary
            let parseSummary = '';

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
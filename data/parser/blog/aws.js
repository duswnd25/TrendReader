// TODO 변경필요
const rootUrl = 'https://aws.amazon.com/ko/blogs/korea/';
const headerSrc = 'https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2017/03/05/aws-korea-weekly.png';
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
        let articleItem = $('article.post').eq(0);

        // Title
        let titleItem = articleItem.children('h2').eq(0).children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');

        // Summary
        let parseSummary = articleItem.children('section').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.header_src = headerSrc;
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};
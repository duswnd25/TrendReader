// TODO 변경필요
const rootUrl = 'https://blog.outsider.ne.kr/category';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {
        let $ = cheerio.load(body);

        if (error) {
            console.error(error);
        }

        let result = resultItem.getResultItem();
        if (body) {
            // Name
            let blogName = $('title').eq(0).text();

            // Article
            let articleItem = $('dl.post').eq(0);

            // Title
            let titleItem = articleItem.children('dt').eq(0).children('a');
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Summary
            let parseSummary = ''; // 표시 없음

            // Result
            result.name = blogName;
            result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.title = parseTitle;
            result.link = rootUrl.replace('/category', '') + parseLink;
            result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
            result.category = ['individual', 'tech'];

            rootCallback(result);
        } else {
            result.name = "";
            rootCallback(result);
        }
    });
};
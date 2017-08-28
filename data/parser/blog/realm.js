// TODO 변경필요
const rootUrl = 'https://blog.realm.io/kr/';

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
        let articleItem = $('div.post.quick').eq(0).children('div.article-block.flex.center.column').eq(0);

        // Title
        let titleItem = articleItem.children('a').eq(0);
        let parseTitle = titleItem.children('h3').eq(0).text();
        let parseLink = 'https://blog.realm.io' + titleItem.attr('href');

        // Summary
        let parseSummary = articleItem.children('div.excerpt.col-xs-12.text-left').eq(0)
            .children('div.summary').eq(0).text(); // 표시 없음

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.title = parseTitle;
        result.link = parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};
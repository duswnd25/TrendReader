// TODO 변경필요
const rootUrl = 'http://blog.jandi.com/ko/';

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
        let articleItem = $('article').eq(0)
            .children('header.article__header').eq(0);

        // Title
        let titleItem = articleItem
            .children('h3.article__title.entry-title').eq(0)
            .children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');

        // Header
        let parseHeaderSrc = articleItem
            .children('div.article__featured-image').eq(0)
            .children('a').eq(0)
            .children('img').eq(0).attr('src');

        // Summary
        let parseSummary = articleItem.children('section.article__content.entry-summary').eq(0)
            .children('a').eq(0)
            .children('p').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.header_src = parseHeaderSrc;
        result.title = parseTitle;
        result.link = rootUrl + parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};
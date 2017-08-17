// TODO 변경필요
const rootUrl = 'http://tech.kakao.com/';
const headerSrc = 'http://tech.kakao.com/assets/images/default_blog_cover.jpg'; // 표시없음

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
        let articleItem = $('li.post-item.post').eq(0);

        // Title
        let titleItem = articleItem.children('a').eq(0);
        let parseTitle = titleItem.children('h3.post-title').eq(0).text();
        let parseLink = titleItem.attr('href');

        // Summary
        let parseSummary = titleItem.children('p.post-excerpt').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.name = blogName;
        result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.header_src = headerSrc;
        result.title = parseTitle;
        result.link = rootUrl + parseLink;
        result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.type = 'C';

        rootCallback(result);
    });
};
// TODO 변경필요
const rootUrl = 'http://readme.skplanet.com/';
const headerSrc = 'http://readme.skplanet.com/wp-content/themes/blaskan/img/bg_13header01.png';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {
        let $ = cheerio.load(body);

        // Title
        let blogName = $('title').eq(0).text().substring(0, 20);

        // Article
        let articleItem = $('section#content').eq(0).children('article').eq(0);

        // Title
        let titleItem = articleItem.children('header').eq(0).children('h1').eq(0).children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = rootUrl + titleItem.attr('href');

        // Summary
        let parseSummary = articleItem.children('div.content').text();

        // Result
        let result = resultItem.getResultItem();
        result.blog_name = blogName;
        result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.blog_header_src = headerSrc;
        result.article_title = parseTitle;
        result.article_link = parseLink;
        result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.blog_type = 'C';

        rootCallback(result);
    });
};
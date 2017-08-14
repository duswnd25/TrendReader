// TODO 변경필요
const rootUrl = 'http://d2.naver.com/home';

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
        let articleItem = $('div.cont_post').eq(0);

        console.log($.html());

        // Title
        let titleItem = articleItem.children('h2').eq(0).children('a').eq(0);
        let parseTitle = titleItem.text();
        let parseLink = titleItem.attr('href');

        // Header Image
        let parseHeaderSrc = articleItem.children('div.cont_img').eq(0)
            .children('a').eq(0)
            .children('img').eq(0).attr('src');

        // Summary
        let parseSummary = articleItem.children('a.post_txt_wrap').eq(0)
            .children('div.post_txt').eq(0).text();

        // Result
        let result = resultItem.getResultItem();
        result.blog_name = blogName;
        result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
        result.blog_header_src = parseHeaderSrc;
        result.article_title = parseTitle;
        result.article_link = parseLink;
        result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
        result.blog_type = 'C';

        rootCallback(result);
    });
};
// TODO 변경필요
const rootUrl = 'https://engineering.linecorp.com/ko/blog';

// Module
const cheerio = require('cheerio');
const request = require('request');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    request(rootUrl, function (error, response, body) {

        if (error) {
            console.error(error);
        }

        if (body) {
            let $ = cheerio.load(body);

            // Name
            let blogName = $('title').eq(0).text();

            // Article
            let articleItem = $('ul.blog_list').eq(0).children('li').eq(0);

            // Title
            let titleItem = articleItem.children('a.bl_title').eq(0);
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Summary
            let parseSummary = articleItem.children('div.bl_content.frontstage.markdown-out').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.name = blogName;
            result.favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.title = parseTitle;
            result.link = rootUrl + parseLink;
            result.summary = parseSummary.length > 200 ? parseSummary.substring(0, 300) : parseSummary;
            result.category = ['company', 'tech'];

            rootCallback(result);
        } else {
            rootCallback("");
        }
    });
};
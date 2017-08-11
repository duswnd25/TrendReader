// TODO 변경필요
const rootUrl = 'http://blog.jandi.com/ko/';

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const resultItem = require('../result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

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

            // Date
            let parseDate = articleItem.children('abbr.published.updated').eq(0).attr('title');

            // Summary
            let parseSummary = articleItem.children('section.article__content.entry-summary').eq(0)
                .children('a').eq(0)
                .children('p').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = parseHeaderSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = rootUrl + parseLink;
            result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
            result.blog_type = 'C';

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
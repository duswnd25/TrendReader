// TODO 변경필요
const blogName = 'Jandi';
const rootUrl = 'http://blog.jandi.com/ko/';

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const rootPath = process.cwd();
const resultItem = require(rootPath + '/data/parser/result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

            // Title
            let titleItem = $('h3.article__title.entry-title').eq(0).children('a').eq(0);
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Header
            let parseHeaderSrc = $('div.article__featured-image').eq(0).children('a').eq(0).children('img').eq(0).attr('src');

            // Date
            let parseDate = $('abbr.published.updated').eq(0).attr('title');

            // Summary
            let parseSummary = $('section.article__content.entry-summary').eq(0).children('a').eq(0).children('p').eq(0).text();

            let data = resultItem.getResultItem();
            data.blog_name = blogName;
            data.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            data.blog_header_src = parseHeaderSrc;
            data.article_title = parseTitle;
            data.article_date = parseDate;
            data.article_link = rootUrl + parseLink;
            data.article_summary = parseSummary;

            rootCallback(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}
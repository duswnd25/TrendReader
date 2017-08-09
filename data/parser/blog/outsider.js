// TODO 변경필요
const blogName = 'Outsider\'s Dev Story';
const rootUrl = 'https://blog.outsider.ne.kr/category';
const parseHeaderSrc = 'https://blog.outsider.ne.kr/skin/blog/anti_verbose/images/main-bg.jpg.pagespeed.ce.0KiEbhhP7k.jpg'; // 표시 없음

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const rootPath = process.cwd();
const resultItem = require(rootPath + '/data/parser/result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

            // Article
            let articleItem = $('dl.post').eq(0);

            // Title
            let titleItem = articleItem.children('dt').eq(0).children('a');
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Date
            let parseDate = articleItem.children('dd.postmetadata').eq(0).text().split('\|')[0];

            // Summary
            let parseSummary = ''; // 표시 없음

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = parseHeaderSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = parseLink;
            result.article_summary = parseSummary;

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
// TODO 변경필요
const blogName = 'Outsider\'s Dev Story';
const rootUrl = 'https://blog.outsider.ne.kr/category';

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
            let parseTitle = articleItem.children('dt').eq(0).children('a');
            let parseLink = parseTitle.attr('href');

            // Date
            let parseDate = ($('dd.postmetadata').eq(0).text()).split('\|')[0];

            // Header Image
            let parseHeaderSrc = 'https://blog.outsider.ne.kr/skin/blog/anti_verbose/images/main-bg.jpg.pagespeed.ce.0KiEbhhP7k.jpg';

            // Summary
            let parseSummary = $('div.u-contentSansThin.u-lineHeightBaseSans.u-fontSize24.u-xs-fontSize18').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = parseHeaderSrc;
            result.article_title = parseTitle.text();
            result.article_date = parseDate;
            result.article_link = parseLink;
            result.article_summary = parseSummary;

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
}
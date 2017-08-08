// TODO 변경필요
const blogName = 'Linchpin';
const rootUrl = 'http://www.linchpinsoft.com/blog/';

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const rootPath = process.cwd();
const resultItem = require(rootPath + '/data/parser/result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

            let articleItem = $('article.post-summary.post-format-standard.clearfix').eq(0);

            // Title
            let parseTitle = articleItem.children('div.post-details').eq(0).children('h2.post-title').eq(0).text();
            let parseLink = articleItem.children('div.post-details').eq(0).children('p.post-excerpt').eq(0).text();

            // Date
            let parseDate = $('li.post-date').eq(0).text();

            // Header Image
            let parseHeaderSrc = articleItem.children('div.post-image').eq(0).children('a').eq(0).children('img').attr('src');

            // Summary
            let parseSummary = $('div.u-contentSansThin.u-lineHeightBaseSans.u-fontSize24.u-xs-fontSize18').eq(0).text();

            let data = resultItem.getResultItem();
            data.blog_name = blogName;
            data.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            data.blog_header_src = parseHeaderSrc;
            data.article_title = parseTitle;
            data.article_date = parseDate;
            data.article_link = parseLink;
            data.article_summary = parseSummary;

            rootCallback(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}
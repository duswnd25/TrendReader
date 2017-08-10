// TODO 변경필요
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

            // Title
            let blogName = $('title').eq(0).text().substring(0, 20);

            // Article
            let articleItem = $('article.post-summary.post-format-standard.clearfix').eq(0)
                .children('div.post-details').eq(0);

            // Title
            let titleItem = articleItem.children('h2.post-title').eq(0)
                .children('a').eq(0);
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Date
            let parseDate = articleItem.children('ul.post-meta.clearfix').eq(0)
                .children('li.post-date').text();

            // Header Image
            let parseHeaderSrc = articleItem.parent().eq(0)
                .children('div.post-image').eq(0)
                .children('a').eq(0)
                .children('img').attr('src');

            // Summary
            let parseSummary = articleItem.children('p.post-excerpt').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = parseHeaderSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = parseLink;
            result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
            result.blog_type = 'C';

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
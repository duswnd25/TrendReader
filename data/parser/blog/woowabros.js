// TODO 변경필요
const blogName = '우아한형제들';
const rootUrl = 'http://woowabros.github.io/';
const headerSrc = 'http://woowabros.github.io/img/slide2.jpg'; // 표시없음

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
            let articleItem = $('div.list-module').eq(0);

            // Title
            let titleItem = articleItem.children('a').eq(0);
            let parseTitle = titleItem.children('h2.post-link').eq(0).text();
            let parseLink = titleItem.attr('href');

            // Summary
            let parseSummary = titleItem.children('p.post-description').eq(0).text();

            // Date
            let parseDate = articleItem.children('span.post-meta').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = headerSrc;
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
// TODO 변경필요
const blogName = 'Kakao';
const rootUrl = 'http://tech.kakao.com/';
const headerSrc = 'http://tech.kakao.com/assets/images/default_blog_cover.jpg'; // 표시없음

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
            let articleItem = $('li.post-item.post').eq(0);

            // Title
            let titleItem = articleItem.children('a').eq(0);
            let parseTitle = titleItem.children('h3.post-title').eq(0).text();
            let parseLink = titleItem.attr('href');

            // Summary
            let parseSummary = titleItem.children('p.post-excerpt').eq(0).text();

            // Date
            let parseDate = articleItem.children('div.post-meta').eq(0).children('p.post-date').text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = headerSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = rootUrl + parseLink;
            result.article_summary = parseSummary;

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
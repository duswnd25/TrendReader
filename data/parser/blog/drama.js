// TODO 변경필요
const blogName = 'Drama & Company';
const rootUrl = 'http://blog.dramancompany.com/category/develop/';
const headerSrc = 'http://blog.dramancompany.com/wp-content/uploads/2015/11/2000_dark.png';

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
            let articleItem = $('article').eq(0);
            // Title
            let titleItem = articleItem.children('div.post-article.post-title').eq(0).children('h2.title').eq(0);
            let parseTitle = titleItem.children('a').text();
            let parseLink = titleItem.children('a').attr('href');

            // Date
            let parseDate = ''; // 메인화면에 표시되지 않음

            // Summary
            let parseSummary = articleItem.children('div.post-article').eq(1).children('p').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = headerSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = parseLink;
            result.article_summary = parseSummary;

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
}
// TODO 변경필요
const blogName = 'Realm';
const rootUrl = 'https://news.realm.io/kr/news/';

// Module
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const rootPath = process.cwd();
const resultItem = require(rootPath + '/data/parser/result_item');

exports.getData = function (rootCallback) {
    requestPromise(rootUrl)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);

            let articleItem = $('div.post.quick').eq(0).children('div.article-block.flex.center.column').eq(0);

            // Title
            let titleItem = articleItem.children('a.news-headline.col-xs-12.col-sm-10.text-center').eq(0);
            let parseTitle = titleItem.text();
            let parseLink = titleItem.attr('href');

            // Header
            let parseHeaderSrc = 'http://' + articleItem.children('a.post.quick.header-image').eq(0)
                .children('img.col-xs-12.article-img').eq(0).attr('data-cfsrc').replace("//", "");

            // Date
            let parseDate = ''; // 표시 없음

            // Summary
            let parseSummary = ''; // 표시 없음

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = parseHeaderSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = 'https://news.realm.io' + parseLink;
            result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
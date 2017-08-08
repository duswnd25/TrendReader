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
            let parseTitle = articleItem.children('a.news-headline.col-xs-12.col-sm-10.text-center').eq(0);
            let parseLink = parseTitle.attr('href');

            // Date
            let parseDate = ''; // 표시 없음

            // Summary
            let parseSummary = ''; // 표시 없음

            let parseHeaderSrc = articleItem.children('a.post.quick.header-image').eq(0)
                .children('img.col-xs-12.article-img').eq(0).attr('data-cfsrc');

            let data = resultItem.getResultItem();
            data.blog_name = blogName;
            data.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            data.blog_header_src = parseHeaderSrc
            data.article_title = parseTitle.text();
            data.article_date = parseDate;
            data.article_link = 'https://news.realm.io' + parseLink;
            data.article_summary = parseSummary;

            rootCallback(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}
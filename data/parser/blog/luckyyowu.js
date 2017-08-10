// TODO 변경필요
const rootUrl = 'http://luckyyowu.tistory.com/';
const headerSrc = 'http://cfile4.uf.tistory.com/image/25438D4353F39A252F6A0B'; // 표시 없으
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
            let articleItem = $('div.list_content').eq(0);

            // Title
            let titleItem = articleItem.children('a.link_post').eq(0);
            let parseTitle = titleItem.children('strong.tit_post').eq(0).text();
            let parseLink = titleItem.attr('href');

            // Date
            let parseDate = articleItem.children('div.detail_info').eq(0).text(); // 표시 없음

            // Summary
            let parseSummary = titleItem.children('p.txt_post').eq(0).text(); // 표시 없음

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = headerSrc;
            result.article_title = parseTitle;
            result.article_date = parseDate;
            result.article_link = rootUrl + parseLink;
            result.article_summary = parseSummary.length > 200 ? parseSummary.substring(0, 200) : parseSummary;
            result.blog_type = 'P';

            rootCallback(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
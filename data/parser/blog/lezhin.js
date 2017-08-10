// TODO 변경필요
const blogName = 'Lezhin Tech';
const rootUrl = 'http://tech.lezhin.com/';
const headerSrc = 'http://tech.lezhin.com/assets/img/lezhin_trans_128x128.png'; // 표시 없음

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
            let articleItem = $('li.post-item').eq(0);

            // Title
            let titleItem = articleItem.children('h2.post-title').eq(0);
            let parseTitle = titleItem.children('a').text();
            let parseLink = rootUrl + titleItem.children('a').attr('href');

            // Date
            let parseDate = articleItem.children('div.post-meta').eq(0)
                .children('p.post-date').eq(0).text();

            // Summary
            let parseSummary = articleItem.children('div.post-summary').eq(0).text();

            // Result
            let result = resultItem.getResultItem();
            result.blog_name = blogName;
            result.blog_favicon_src = 'https://www.google.com/s2/favicons?domain=' + rootUrl;
            result.blog_header_src = headerSrc;
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